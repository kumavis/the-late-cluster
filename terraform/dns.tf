# DNS records in the existing zone var.zone_id. Each resource is empty unless its variables
# are set, so a configuration with no variables plans nothing.

locals {
  # Every record carries a comment so it is recognisable in the Cloudflare dashboard.
  # Cloudflare rejects a DNS record comment longer than 100 characters on the Free plan
  # (API error 9313), so the prefix is short and every comment is cut to comment_max.
  comment_prefix = "Managed by Terraform"
  comment_max    = 100

  site_enabled = var.site_hostname != null
  site_is_apex = local.site_enabled && var.site_hostname == var.zone_name

  # The seam between the site's hostname and whatever hosts it.
  #
  # Each target says two things: the hostname a subdomain's CNAME points at, and the address
  # records an apex gets (null when the host is reached by a CNAME at the apex too, which
  # Cloudflare flattens). The records below are derived from the selected target only, so
  # moving hosts is a change of site_target plus the new target's entry and resources, not
  # a change to the record resources. README.md, "Moving the site to Cloudflare Pages".
  site_targets = {
    # GitHub Pages: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
    github_pages = {
      cname = var.github_pages_owner == null ? null : "${lower(var.github_pages_owner)}.github.io"
      apex_addresses = {
        A    = ["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"]
        AAAA = ["2606:50c0:8000::153", "2606:50c0:8001::153", "2606:50c0:8002::153", "2606:50c0:8003::153"]
      }
    }

    # Later, with a cloudflare_pages_project.site resource (see pages.tf in README.md):
    # cloudflare_pages = {
    #   cname          = one(cloudflare_pages_project.site[*].subdomain) # <project>.pages.dev
    #   apex_addresses = null                                            # apex CNAME, flattened
    # }
  }

  site_target = local.site_targets[var.site_target]

  # Keyed by "<type> <content>" so each address record has a stable, readable address in
  # state, for example cloudflare_dns_record.site["A 185.199.108.153"].
  site_records = !local.site_enabled ? {} : (
    local.site_is_apex && local.site_target.apex_addresses != null
    ? merge([
      for type, addresses in local.site_target.apex_addresses : {
        for address in addresses : "${type} ${address}" => { type = type, content = address }
      }
    ]...)
    : { "CNAME" = { type = "CNAME", content = local.site_target.cname } }
  )

  # TXT content is sent quoted, which is how Cloudflare stores TXT strings (the dashboard
  # adds the quotes itself), so the state matches what the API returns.
  extra_records = {
    for key, r in var.extra_records : key => merge(r, {
      content = r.type == "TXT" && !startswith(r.content, "\"") ? "\"${r.content}\"" : r.content
    })
  }
}

# The site's hostname: a CNAME for a subdomain, or the host's A and AAAA records for the apex.
resource "cloudflare_dns_record" "site" {
  for_each = local.site_records

  zone_id = var.zone_id
  name    = var.site_hostname
  type    = each.value.type
  content = each.value.content
  proxied = var.site_proxied
  ttl     = 1
  comment = substr("${local.comment_prefix}: site on ${var.site_target}", 0, local.comment_max)
}

# GitHub's domain verification record. It protects the domain from being claimed by another
# GitHub account's Pages site. https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
resource "cloudflare_dns_record" "github_pages_verification" {
  count = var.github_pages_verification_code == null ? 0 : 1

  zone_id = var.zone_id
  name    = "_github-pages-challenge-${lower(var.github_pages_owner)}.${var.zone_name}"
  type    = "TXT"
  content = "\"${var.github_pages_verification_code}\""
  ttl     = 1
  comment = substr("${local.comment_prefix}: GitHub Pages domain verification", 0, local.comment_max)
}

# One TXT record per Bluesky handle. https://atproto.com/specs/handle
resource "cloudflare_dns_record" "bluesky_handle" {
  for_each = var.bluesky_handles

  zone_id = var.zone_id
  name    = "_atproto.${each.key}"
  type    = "TXT"
  content = "\"did=${each.value}\""
  ttl     = 1
  comment = substr("${local.comment_prefix}: Bluesky handle ${each.key}", 0, local.comment_max)
}

# Anything else, from var.extra_records.
resource "cloudflare_dns_record" "extra" {
  for_each = local.extra_records

  zone_id  = var.zone_id
  name     = each.value.name
  type     = each.value.type
  content  = each.value.content
  ttl      = each.value.ttl
  proxied  = each.value.proxied
  priority = each.value.priority
  comment  = substr(each.value.comment == null ? "${local.comment_prefix}: ${each.key}" : each.value.comment, 0, local.comment_max)
}
