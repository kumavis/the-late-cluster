output "site_url" {
  description = "The site's public URL, with the trailing slash, to put in siteUrl in show.config.json at the repository root. Null when site_hostname is not set."
  value       = var.site_hostname == null ? null : "https://${var.site_hostname}/"
}

output "github_pages_custom_domain" {
  description = "What to enter as the custom domain in the repository's Settings, Pages. Null unless the site is on GitHub Pages."
  value       = var.site_hostname != null && var.site_target == "github_pages" ? var.site_hostname : null
}

output "records" {
  description = "Every record this configuration manages, by resource address: name, type, content and whether it is proxied."
  value = merge(
    { for k, r in cloudflare_dns_record.site : "site[\"${k}\"]" => { name = r.name, type = r.type, content = r.content, proxied = r.proxied } },
    { for i, r in cloudflare_dns_record.github_pages_verification : "github_pages_verification[${i}]" => { name = r.name, type = r.type, content = r.content, proxied = r.proxied } },
    { for k, r in cloudflare_dns_record.bluesky_handle : "bluesky_handle[\"${k}\"]" => { name = r.name, type = r.type, content = r.content, proxied = r.proxied } },
    { for k, r in cloudflare_dns_record.extra : "extra[\"${k}\"]" => { name = r.name, type = r.type, content = r.content, proxied = r.proxied } },
  )
}
