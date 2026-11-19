# Redirects: hostnames in the zone that send every request elsewhere, from var.redirects.
#
# Each needs two things at Cloudflare:
#
# - A proxied DNS record, so requests for the hostname reach Cloudflare at all. It points at
#   192.0.2.1, the placeholder Cloudflare documents for a hostname with no origin (a
#   documentation address that routes nowhere; the redirect answers before any origin is
#   contacted). https://developers.cloudflare.com/fundamentals/manage-domains/redirect-domain/
# - A rule in the zone's Single Redirects ruleset (phase http_request_dynamic_redirect).
#   A zone has at most one entry-point ruleset per phase, so every redirect is a rule in the
#   one cloudflare_ruleset below; a second ruleset resource for the same phase would fail.
#   https://developers.cloudflare.com/ruleset-engine/about/phases/
#
# The ruleset needs the token permission Zone, Single Redirect, Edit (README.md).

locals {
  redirect_placeholder_ipv4 = "192.0.2.1"
}

resource "cloudflare_dns_record" "redirect" {
  for_each = var.redirects

  zone_id = var.zone_id
  name    = each.value.hostname
  type    = "A"
  content = local.redirect_placeholder_ipv4
  proxied = true
  ttl     = 1
  comment = "${local.comment_prefix}: placeholder for redirect ${each.key}, no origin"
}

# The zone's entry-point ruleset for Single Redirects, created only when there is at least
# one redirect. If the zone already has one (made in the dashboard), import it instead of
# creating it: imports.tf and README.md, "Redirects".
resource "cloudflare_ruleset" "redirects" {
  count = length(var.redirects) == 0 ? 0 : 1

  zone_id     = var.zone_id
  name        = "Redirects"
  description = "${local.comment_prefix}: Single Redirects from var.redirects"
  kind        = "zone"
  phase       = "http_request_dynamic_redirect"

  # One rule per redirect, ordered by key. A rule matches every request to its hostname,
  # over HTTP and HTTPS. A static target_url.value redirects to the URL as given; with
  # keep_path_and_query the target is an expression that appends the request's path, and
  # the query string is preserved by Cloudflare. target_url is validated to contain no
  # double quote or backslash, so it is safe inside the expression's string literal.
  rules = [
    for key in sort(keys(var.redirects)) : {
      ref         = key
      description = "Redirect ${var.redirects[key].hostname} (${key})"
      enabled     = true
      expression  = "(http.host eq \"${var.redirects[key].hostname}\")"
      action      = "redirect"
      action_parameters = {
        from_value = {
          status_code           = var.redirects[key].status_code
          preserve_query_string = var.redirects[key].keep_path_and_query
          target_url = var.redirects[key].keep_path_and_query ? {
            expression = "concat(\"${trimsuffix(var.redirects[key].target_url, "/")}\", http.request.uri.path)"
            value      = null
            } : {
            expression = null
            value      = var.redirects[key].target_url
          }
        }
      }
    }
  ]
}
