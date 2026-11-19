# Planned records for each case, against a mocked Cloudflare provider: no token, no API
# calls, only the provider schema from terraform init. Run from terraform/ with:
#
#   terraform init -backend=false
#   terraform test
#
# All names are on the reserved example.com and example.net domains; the ids are made up.
#
# terraform test loads the committed terraform.tfvars into every run. These cases must not
# depend on it, so this block resets every variable to its default, and each run sets
# only what it needs on top (a run's variables override these, which override the
# tfvars file). tests/committed.tftest.hcl is the one that tests the committed values.

mock_provider "cloudflare" {}

variables {
  zone_id                        = null
  zone_name                      = null
  site_hostname                  = null
  site_target                    = "github_pages"
  site_proxied                   = false
  github_pages_owner             = null
  github_pages_verification_code = null
  bluesky_handles                = {}
  extra_records                  = {}
}

# ---------------------------------------------------------------------------------------
# Planned records
# ---------------------------------------------------------------------------------------

run "nothing_set_plans_nothing" {
  command = plan

  assert {
    condition     = length(cloudflare_dns_record.site) + length(cloudflare_dns_record.github_pages_verification) + length(cloudflare_dns_record.bluesky_handle) + length(cloudflare_dns_record.extra) == 0
    error_message = "With no variables set, no record may be planned."
  }

  assert {
    condition     = output.site_url == null && output.github_pages_custom_domain == null && length(output.records) == 0
    error_message = "With no variables set, the outputs must be empty."
  }
}

run "zone_only_plans_nothing" {
  command = plan

  variables {
    zone_id   = "0123456789abcdef0123456789abcdef"
    zone_name = "example.com"
  }

  assert {
    condition     = length(output.records) == 0
    error_message = "A zone with nothing switched on must plan no record."
  }
}

run "subdomain_site_is_one_cname" {
  command = plan

  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    zone_name          = "example.com"
    site_hostname      = "show.example.com"
    github_pages_owner = "Example-Owner"
  }

  assert {
    condition     = keys(cloudflare_dns_record.site) == ["CNAME"]
    error_message = "A subdomain site must be exactly one CNAME."
  }

  assert {
    condition = (
      cloudflare_dns_record.site["CNAME"].name == "show.example.com" &&
      cloudflare_dns_record.site["CNAME"].type == "CNAME" &&
      cloudflare_dns_record.site["CNAME"].content == "example-owner.github.io" &&
      cloudflare_dns_record.site["CNAME"].zone_id == "0123456789abcdef0123456789abcdef" &&
      cloudflare_dns_record.site["CNAME"].ttl == 1
    )
    error_message = "The subdomain CNAME must point show.example.com at <owner>.github.io (lowercased) with automatic TTL."
  }

  assert {
    condition     = cloudflare_dns_record.site["CNAME"].proxied == false
    error_message = "The site must not be proxied by default."
  }

  assert {
    condition     = output.site_url == "https://show.example.com/" && output.github_pages_custom_domain == "show.example.com"
    error_message = "site_url must be the https URL with a trailing slash, and the custom domain the bare hostname."
  }
}

run "apex_site_is_github_address_records" {
  command = plan

  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    zone_name          = "example.com"
    site_hostname      = "example.com"
    github_pages_owner = "example-owner"
  }

  assert {
    condition = toset(keys(cloudflare_dns_record.site)) == toset([
      "A 185.199.108.153", "A 185.199.109.153", "A 185.199.110.153", "A 185.199.111.153",
      "AAAA 2606:50c0:8000::153", "AAAA 2606:50c0:8001::153", "AAAA 2606:50c0:8002::153", "AAAA 2606:50c0:8003::153",
    ])
    error_message = "An apex site must be GitHub's four A and four AAAA records and nothing else."
  }

  assert {
    condition     = alltrue([for k, r in cloudflare_dns_record.site : r.name == "example.com" && "${r.type} ${r.content}" == k && r.proxied == false])
    error_message = "Every apex record must be at the zone name, match its key, and be DNS only by default."
  }

  assert {
    condition     = output.site_url == "https://example.com/"
    error_message = "site_url must be the apex URL."
  }
}

run "subdomain_site_proxied" {
  command = plan

  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    zone_name          = "example.com"
    site_hostname      = "show.example.com"
    github_pages_owner = "example-owner"
    site_proxied       = true
  }

  assert {
    condition     = cloudflare_dns_record.site["CNAME"].proxied == true
    error_message = "site_proxied = true must proxy the CNAME."
  }
}

run "apex_site_proxied" {
  command = plan

  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    zone_name          = "example.com"
    site_hostname      = "example.com"
    github_pages_owner = "example-owner"
    site_proxied       = true
  }

  assert {
    condition     = length(cloudflare_dns_record.site) == 8 && alltrue([for r in values(cloudflare_dns_record.site) : r.proxied == true])
    error_message = "site_proxied = true must proxy every apex record."
  }
}

run "github_verification_record" {
  command = plan

  variables {
    zone_id                        = "0123456789abcdef0123456789abcdef"
    zone_name                      = "example.com"
    github_pages_owner             = "Example-Owner"
    github_pages_verification_code = "0123456789abcdef0123456789abcd"
  }

  assert {
    condition = (
      length(cloudflare_dns_record.github_pages_verification) == 1 &&
      cloudflare_dns_record.github_pages_verification[0].name == "_github-pages-challenge-example-owner.example.com" &&
      cloudflare_dns_record.github_pages_verification[0].type == "TXT" &&
      cloudflare_dns_record.github_pages_verification[0].content == "\"0123456789abcdef0123456789abcd\""
    )
    error_message = "The verification record must be TXT _github-pages-challenge-<owner>.<zone> with the quoted code."
  }

  assert {
    condition     = length(cloudflare_dns_record.site) == 0
    error_message = "Verification alone must not create site records."
  }
}

run "several_bluesky_handles" {
  command = plan

  variables {
    zone_id   = "0123456789abcdef0123456789abcdef"
    zone_name = "example.com"
    bluesky_handles = {
      "example.com"      = "did:plc:abcdefghijklmnopqrstuvwx"
      "show.example.com" = "did:plc:234567abcdefghijklmnopqr"
      "bot.example.com"  = "did:web:bot.example.com"
    }
  }

  assert {
    condition     = length(cloudflare_dns_record.bluesky_handle) == 3
    error_message = "Each handle must get one record."
  }

  assert {
    condition = (
      cloudflare_dns_record.bluesky_handle["example.com"].name == "_atproto.example.com" &&
      cloudflare_dns_record.bluesky_handle["example.com"].content == "\"did=did:plc:abcdefghijklmnopqrstuvwx\"" &&
      cloudflare_dns_record.bluesky_handle["show.example.com"].name == "_atproto.show.example.com" &&
      cloudflare_dns_record.bluesky_handle["show.example.com"].content == "\"did=did:plc:234567abcdefghijklmnopqr\"" &&
      cloudflare_dns_record.bluesky_handle["bot.example.com"].content == "\"did=did:web:bot.example.com\""
    )
    error_message = "Each handle must be TXT _atproto.<handle> with the quoted value did=<DID>."
  }

  assert {
    condition     = alltrue([for r in values(cloudflare_dns_record.bluesky_handle) : r.type == "TXT" && r.ttl == 1])
    error_message = "Handle records must be TXT with automatic TTL."
  }
}

run "extra_records" {
  command = plan

  variables {
    zone_id   = "0123456789abcdef0123456789abcdef"
    zone_name = "example.com"
    extra_records = {
      "mail-mx" = { name = "example.com", type = "MX", content = "mail.example.net", priority = 10 }
      "spf"     = { name = "example.com", type = "TXT", content = "v=spf1 -all", comment = "No mail is sent" }
      "quoted"  = { name = "_dmarc.example.com", type = "TXT", content = "\"v=DMARC1; p=reject\"" }
      "www"     = { name = "www.example.com", type = "CNAME", content = "example.net", ttl = 3600 }
      "edge"    = { name = "edge.example.com", type = "A", content = "192.0.2.10", proxied = true }
    }
  }

  assert {
    condition = (
      cloudflare_dns_record.extra["mail-mx"].type == "MX" &&
      cloudflare_dns_record.extra["mail-mx"].priority == 10 &&
      cloudflare_dns_record.extra["mail-mx"].content == "mail.example.net" &&
      cloudflare_dns_record.extra["mail-mx"].ttl == 1 &&
      cloudflare_dns_record.extra["mail-mx"].proxied == false
    )
    error_message = "The MX record must carry its priority and the defaults (ttl 1, not proxied)."
  }

  assert {
    condition     = cloudflare_dns_record.extra["spf"].content == "\"v=spf1 -all\"" && cloudflare_dns_record.extra["spf"].comment == "No mail is sent"
    error_message = "Unquoted TXT content must be quoted, and a given comment kept."
  }

  assert {
    condition     = cloudflare_dns_record.extra["quoted"].content == "\"v=DMARC1; p=reject\""
    error_message = "Already quoted TXT content must not be quoted twice."
  }

  assert {
    condition     = cloudflare_dns_record.extra["www"].ttl == 3600 && cloudflare_dns_record.extra["www"].content == "example.net"
    error_message = "A given TTL must be kept."
  }

  assert {
    condition     = cloudflare_dns_record.extra["edge"].proxied == true
    error_message = "A proxied extra record must be proxied."
  }

  assert {
    condition     = startswith(cloudflare_dns_record.extra["www"].comment, "Managed by Terraform")
    error_message = "Without a comment, an extra record gets the default comment."
  }
}

# The example from the README: a subdomain site, one Bluesky handle, one extra record.
run "readme_example" {
  command = plan

  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    zone_name          = "example.com"
    site_hostname      = "show.example.com"
    github_pages_owner = "example-owner"
    bluesky_handles    = { "show.example.com" = "did:plc:abcdefghijklmnopqrstuvwx" }
    extra_records      = { "spf" = { name = "example.com", type = "TXT", content = "v=spf1 -all" } }
  }

  assert {
    condition = { for k, r in output.records : k => { name = r.name, type = r.type, content = r.content } } == {
      "site[\"CNAME\"]"                      = { name = "show.example.com", type = "CNAME", content = "example-owner.github.io" }
      "bluesky_handle[\"show.example.com\"]" = { name = "_atproto.show.example.com", type = "TXT", content = "\"did=did:plc:abcdefghijklmnopqrstuvwx\"" }
      "extra[\"spf\"]"                       = { name = "example.com", type = "TXT", content = "\"v=spf1 -all\"" }
    }
    error_message = "The README example must plan exactly these three records."
  }
}

# ---------------------------------------------------------------------------------------
# Validation failures
# ---------------------------------------------------------------------------------------

run "fails_bad_zone_id" {
  command = plan
  variables {
    zone_id = "not-a-zone-id"
  }
  expect_failures = [var.zone_id]
}

run "fails_records_without_zone_id" {
  command = plan
  variables {
    zone_name       = "example.com"
    bluesky_handles = { "example.com" = "did:plc:abcdefghijklmnopqrstuvwx" }
  }
  expect_failures = [var.zone_id]
}

run "fails_bad_zone_name" {
  command = plan
  variables {
    zone_name = "https://example.com/"
  }
  expect_failures = [var.zone_name]
}

run "fails_uppercase_site_hostname" {
  command = plan
  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    zone_name          = "example.com"
    site_hostname      = "Show.Example.com"
    github_pages_owner = "example-owner"
  }
  expect_failures = [var.site_hostname]
}

run "fails_wildcard_site_hostname" {
  command = plan
  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    zone_name          = "example.com"
    site_hostname      = "*.example.com"
    github_pages_owner = "example-owner"
  }
  expect_failures = [var.site_hostname]
}

run "fails_site_hostname_outside_zone" {
  command = plan
  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    zone_name          = "example.com"
    site_hostname      = "show.example.net"
    github_pages_owner = "example-owner"
  }
  expect_failures = [var.site_hostname]
}

run "fails_site_hostname_lookalike_zone" {
  command = plan
  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    zone_name          = "example.com"
    site_hostname      = "notexample.com"
    github_pages_owner = "example-owner"
  }
  expect_failures = [var.site_hostname]
}

run "fails_site_without_zone_name" {
  command = plan
  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    site_hostname      = "show.example.com"
    github_pages_owner = "example-owner"
  }
  expect_failures = [var.site_hostname]
}

run "fails_unknown_site_target" {
  command = plan
  variables {
    zone_id       = "0123456789abcdef0123456789abcdef"
    zone_name     = "example.com"
    site_hostname = "show.example.com"
    site_target   = "cloudflare_pages"
  }
  expect_failures = [var.site_target]
}

run "fails_site_without_owner" {
  command = plan
  variables {
    zone_id       = "0123456789abcdef0123456789abcdef"
    zone_name     = "example.com"
    site_hostname = "show.example.com"
  }
  expect_failures = [var.github_pages_owner]
}

run "fails_owner_with_github_io" {
  command = plan
  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    zone_name          = "example.com"
    site_hostname      = "show.example.com"
    github_pages_owner = "example-owner.github.io"
  }
  expect_failures = [var.github_pages_owner]
}

run "fails_verification_without_owner" {
  command = plan
  variables {
    zone_id                        = "0123456789abcdef0123456789abcdef"
    zone_name                      = "example.com"
    github_pages_verification_code = "0123456789abcdef0123456789abcd"
  }
  expect_failures = [var.github_pages_verification_code]
}

run "fails_quoted_verification_code" {
  command = plan
  variables {
    zone_id                        = "0123456789abcdef0123456789abcdef"
    zone_name                      = "example.com"
    github_pages_owner             = "example-owner"
    github_pages_verification_code = "\"0123456789abcdef\""
  }
  expect_failures = [var.github_pages_verification_code]
}

run "fails_bad_did" {
  command = plan
  variables {
    zone_id         = "0123456789abcdef0123456789abcdef"
    zone_name       = "example.com"
    bluesky_handles = { "show.example.com" = "did=did:plc:abcdefghijklmnopqrstuvwx" }
  }
  expect_failures = [var.bluesky_handles]
}

run "fails_short_plc_did" {
  command = plan
  variables {
    zone_id         = "0123456789abcdef0123456789abcdef"
    zone_name       = "example.com"
    bluesky_handles = { "show.example.com" = "did:plc:abc" }
  }
  expect_failures = [var.bluesky_handles]
}

run "fails_bluesky_handle_outside_zone" {
  command = plan
  variables {
    zone_id         = "0123456789abcdef0123456789abcdef"
    zone_name       = "example.com"
    bluesky_handles = { "show.example.net" = "did:plc:abcdefghijklmnopqrstuvwx" }
  }
  expect_failures = [var.bluesky_handles]
}

run "fails_bluesky_handle_with_at_sign" {
  command = plan
  variables {
    zone_id         = "0123456789abcdef0123456789abcdef"
    zone_name       = "example.com"
    bluesky_handles = { "@show.example.com" = "did:plc:abcdefghijklmnopqrstuvwx" }
  }
  expect_failures = [var.bluesky_handles]
}

run "fails_extra_bad_type" {
  command = plan
  variables {
    zone_id       = "0123456789abcdef0123456789abcdef"
    zone_name     = "example.com"
    extra_records = { "caa" = { name = "example.com", type = "CAA", content = "0 issue \"letsencrypt.org\"" } }
  }
  expect_failures = [var.extra_records]
}

run "fails_extra_lowercase_type" {
  command = plan
  variables {
    zone_id       = "0123456789abcdef0123456789abcdef"
    zone_name     = "example.com"
    extra_records = { "www" = { name = "www.example.com", type = "cname", content = "example.net" } }
  }
  expect_failures = [var.extra_records]
}

run "fails_extra_bad_key" {
  command = plan
  variables {
    zone_id       = "0123456789abcdef0123456789abcdef"
    zone_name     = "example.com"
    extra_records = { "Mail MX" = { name = "example.com", type = "MX", content = "mail.example.net", priority = 10 } }
  }
  expect_failures = [var.extra_records]
}

run "fails_extra_name_outside_zone" {
  command = plan
  variables {
    zone_id       = "0123456789abcdef0123456789abcdef"
    zone_name     = "example.com"
    extra_records = { "www" = { name = "www.example.net", type = "CNAME", content = "example.org" } }
  }
  expect_failures = [var.extra_records]
}

run "fails_extra_bare_label_name" {
  command = plan
  variables {
    zone_id       = "0123456789abcdef0123456789abcdef"
    zone_name     = "example.com"
    extra_records = { "www" = { name = "www", type = "CNAME", content = "example.org" } }
  }
  expect_failures = [var.extra_records]
}

run "fails_extra_mx_without_priority" {
  command = plan
  variables {
    zone_id       = "0123456789abcdef0123456789abcdef"
    zone_name     = "example.com"
    extra_records = { "mx" = { name = "example.com", type = "MX", content = "mail.example.net" } }
  }
  expect_failures = [var.extra_records]
}

run "fails_extra_proxied_txt" {
  command = plan
  variables {
    zone_id       = "0123456789abcdef0123456789abcdef"
    zone_name     = "example.com"
    extra_records = { "spf" = { name = "example.com", type = "TXT", content = "v=spf1 -all", proxied = true } }
  }
  expect_failures = [var.extra_records]
}

run "fails_extra_proxied_with_ttl" {
  command = plan
  variables {
    zone_id       = "0123456789abcdef0123456789abcdef"
    zone_name     = "example.com"
    extra_records = { "edge" = { name = "edge.example.com", type = "A", content = "192.0.2.10", proxied = true, ttl = 300 } }
  }
  expect_failures = [var.extra_records]
}

run "fails_extra_ttl_out_of_range" {
  command = plan
  variables {
    zone_id       = "0123456789abcdef0123456789abcdef"
    zone_name     = "example.com"
    extra_records = { "www" = { name = "www.example.com", type = "CNAME", content = "example.net", ttl = 30 } }
  }
  expect_failures = [var.extra_records]
}

run "fails_extra_empty_content" {
  command = plan
  variables {
    zone_id       = "0123456789abcdef0123456789abcdef"
    zone_name     = "example.com"
    extra_records = { "spf" = { name = "example.com", type = "TXT", content = " " } }
  }
  expect_failures = [var.extra_records]
}

run "fails_extra_address_at_apex_site" {
  command = plan
  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    zone_name          = "example.com"
    site_hostname      = "example.com"
    github_pages_owner = "example-owner"
    extra_records      = { "old" = { name = "example.com", type = "A", content = "192.0.2.10" } }
  }
  expect_failures = [var.extra_records]
}

run "fails_extra_record_at_subdomain_site" {
  command = plan
  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    zone_name          = "example.com"
    site_hostname      = "show.example.com"
    github_pages_owner = "example-owner"
    extra_records      = { "note" = { name = "show.example.com", type = "TXT", content = "hello" } }
  }
  expect_failures = [var.extra_records]
}

# A TXT record beside an apex site is fine (GitHub only objects to other address records).
run "allows_extra_txt_at_apex_site" {
  command = plan
  variables {
    zone_id            = "0123456789abcdef0123456789abcdef"
    zone_name          = "example.com"
    site_hostname      = "example.com"
    github_pages_owner = "example-owner"
    extra_records      = { "spf" = { name = "example.com", type = "TXT", content = "v=spf1 -all" } }
  }
  assert {
    condition     = length(cloudflare_dns_record.site) == 8 && length(cloudflare_dns_record.extra) == 1
    error_message = "An apex site and a TXT record at the apex must coexist."
  }
}
