# The committed configuration itself: terraform.tfvars, which terraform test loads
# automatically. This file sets no variables, so a bad edit to the real values (a typo in
# the DID, a handle outside the zone, a record switched on by accident, a redirect turned
# permanent) fails here, in CI, before anyone runs a plan against Cloudflare. Mocked
# provider: no token, no API calls.
#
# When terraform.tfvars changes on purpose, change the expectations below with it.

mock_provider "cloudflare" {}

run "committed_configuration" {
  command = plan

  # Records: the Bluesky handle and the apex redirect's placeholder, nothing else.
  assert {
    condition     = length(cloudflare_dns_record.site) == 0 && length(cloudflare_dns_record.github_pages_verification) == 0 && length(cloudflare_dns_record.extra) == 0
    error_message = "The committed configuration must not plan site, verification or extra records yet."
  }

  assert {
    condition = { for k, r in output.records : k => { name = r.name, type = r.type, content = r.content } } == {
      "bluesky_handle[\"latecluster.simcluster.tv\"]" = {
        name    = "_atproto.latecluster.simcluster.tv"
        type    = "TXT"
        content = "\"did=did:plc:zdobmviiuyfkc6xyylmpm2sf\""
      }
      "redirect[\"bluesky-profile\"]" = {
        name    = "simcluster.tv"
        type    = "A"
        content = "192.0.2.1"
      }
    }
    error_message = "The committed configuration must plan exactly the handle record and the apex redirect's placeholder record."
  }

  assert {
    condition = (
      cloudflare_dns_record.bluesky_handle["latecluster.simcluster.tv"].zone_id == "0da61adff2a379b4aca38f85be7f3d10" &&
      cloudflare_dns_record.redirect["bluesky-profile"].zone_id == "0da61adff2a379b4aca38f85be7f3d10" &&
      cloudflare_dns_record.redirect["bluesky-profile"].proxied == true
    )
    error_message = "Both records must be in the simcluster.tv zone, and the placeholder must be proxied."
  }

  # The one ruleset, with the one rule.
  assert {
    condition = (
      length(cloudflare_ruleset.redirects) == 1 &&
      cloudflare_ruleset.redirects[0].zone_id == "0da61adff2a379b4aca38f85be7f3d10" &&
      cloudflare_ruleset.redirects[0].kind == "zone" &&
      cloudflare_ruleset.redirects[0].phase == "http_request_dynamic_redirect" &&
      length(cloudflare_ruleset.redirects[0].rules) == 1
    )
    error_message = "The committed configuration must plan one Single Redirects ruleset with one rule."
  }

  assert {
    condition = (
      cloudflare_ruleset.redirects[0].rules[0].ref == "bluesky-profile" &&
      cloudflare_ruleset.redirects[0].rules[0].action == "redirect" &&
      cloudflare_ruleset.redirects[0].rules[0].expression == "(http.host eq \"simcluster.tv\")" &&
      cloudflare_ruleset.redirects[0].rules[0].action_parameters.from_value.target_url.value == "https://bsky.app/profile/latecluster.simcluster.tv" &&
      cloudflare_ruleset.redirects[0].rules[0].action_parameters.from_value.preserve_query_string == false
    )
    error_message = "The rule must send every request for simcluster.tv to the show's Bluesky profile, dropping path and query."
  }

  assert {
    condition     = cloudflare_ruleset.redirects[0].rules[0].action_parameters.from_value.status_code == 302
    error_message = "The apex redirect must stay temporary (302): the apex may host the site later, and a permanent redirect is cached by browsers."
  }

  assert {
    condition     = output.site_url == null
    error_message = "No site hostname is chosen yet, so site_url must be null."
  }
}
