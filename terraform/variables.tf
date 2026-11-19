# Every input is optional. With nothing set, the plan is empty. Each piece of DNS is
# switched on by setting its variables; terraform.tfvars, committed, shows all of them.
#
# Hostnames are always fully qualified and lowercase ("show.example.com", or the zone's own
# name "example.com" for the apex), never "@" or a bare label, so a value means the same
# thing wherever it appears.
#
# Validations may refer to other variables, but the references must not form a cycle. They
# point one way only: zone_id checks everything; github_pages_verification_code checks
# github_pages_owner and zone_name; github_pages_owner checks the site; redirects checks the
# site, extra_records and the zone; extra_records checks the site and the zone;
# site_hostname and bluesky_handles check zone_name; zone_name and site_target check
# nothing else. A missing zone_name shows up as a hostname that is "not
# in the zone".
#
# The hostname pattern used below (RE2): one or more labels of letters, digits and inner
# hyphens, 1 to 63 characters each, then a top-level label that starts with a letter.

# ---------------------------------------------------------------------------------------
# The zone
# ---------------------------------------------------------------------------------------

variable "zone_id" {
  description = "Id of the existing Cloudflare zone the records go in (32 hexadecimal characters, on the zone's Overview page). The zone itself is not managed here."
  type        = string
  default     = null

  validation {
    condition     = var.zone_id == null || can(regex("^[0-9a-f]{32}$", var.zone_id))
    error_message = "zone_id must be the zone's 32-character lowercase hexadecimal id, shown as \"Zone ID\" on the zone's Overview page in the Cloudflare dashboard."
  }

  validation {
    condition = var.zone_id != null || (
      var.site_hostname == null &&
      var.github_pages_verification_code == null &&
      length(var.bluesky_handles) == 0 &&
      length(var.extra_records) == 0 &&
      length(var.redirects) == 0
    )
    error_message = "zone_id is required once any record is configured (site_hostname, github_pages_verification_code, bluesky_handles, extra_records or redirects)."
  }
}

variable "zone_name" {
  description = "The zone's domain name, for example \"example.com\". Used to tell an apex site from a subdomain and to check that every hostname belongs to the zone."
  type        = string
  default     = null

  validation {
    condition     = var.zone_name == null || can(regex("^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z]([a-z0-9-]{0,61}[a-z0-9])?$", var.zone_name))
    error_message = "zone_name must be a lowercase domain name such as \"example.com\", without a trailing dot or a scheme."
  }
}

# ---------------------------------------------------------------------------------------
# The site
# ---------------------------------------------------------------------------------------

variable "site_hostname" {
  description = "Public hostname of the site, for example \"show.example.com\" (a subdomain, gets a CNAME) or the zone name itself (the apex, gets the host's address records). Null means no site records."
  type        = string
  default     = null

  validation {
    condition     = var.site_hostname == null || can(regex("^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z]([a-z0-9-]{0,61}[a-z0-9])?$", var.site_hostname))
    error_message = "site_hostname must be a lowercase, fully qualified hostname such as \"show.example.com\" or \"example.com\": no scheme, no path, no trailing dot, no wildcard."
  }

  validation {
    condition     = var.site_hostname == null || try(var.site_hostname == var.zone_name || endswith(var.site_hostname, ".${var.zone_name}"), false)
    error_message = "site_hostname must be zone_name itself (the apex) or a name under it, and zone_name must be set, for example \"show.example.com\" in the zone \"example.com\"."
  }
}

variable "site_target" {
  description = "Where the site is hosted. \"github_pages\" is the only target built so far; \"cloudflare_pages\" is the planned second one (README.md, \"Moving the site to Cloudflare Pages\")."
  type        = string
  default     = "github_pages"
  nullable    = false

  validation {
    condition     = contains(["github_pages"], var.site_target)
    error_message = "site_target must be \"github_pages\". Cloudflare Pages is not built yet; README.md says what adding it involves."
  }
}

variable "site_proxied" {
  description = "Whether the site's records go through Cloudflare's proxy (orange cloud). Default false (DNS only) so GitHub sees its own addresses and can issue the site's certificate; README.md explains the trade-off."
  type        = bool
  default     = false
  nullable    = false
}

variable "github_pages_owner" {
  description = "GitHub user or organization that owns the repository publishing the site. The site's CNAME points at <owner>.github.io, and the verification record is named after it."
  type        = string
  default     = null

  validation {
    condition     = var.github_pages_owner == null || can(regex("^[A-Za-z0-9]([A-Za-z0-9-]{0,37}[A-Za-z0-9])?$", var.github_pages_owner))
    error_message = "github_pages_owner must be a GitHub user or organization name: 1 to 39 letters, digits or hyphens, not starting or ending with a hyphen. Do not include \".github.io\" or the repository name."
  }

  validation {
    condition     = var.github_pages_owner != null || var.site_hostname == null || var.site_target != "github_pages"
    error_message = "github_pages_owner is required when site_hostname is set and site_target is \"github_pages\": the site's CNAME points at <owner>.github.io."
  }
}

variable "github_pages_verification_code" {
  description = "Value of GitHub's domain verification TXT record, copied from \"Add a verified domain\" in the GitHub user or organization's Pages settings. Creates _github-pages-challenge-<owner>.<zone_name>."
  type        = string
  default     = null

  validation {
    condition     = var.github_pages_verification_code == null || can(regex("^[A-Za-z0-9_-]{1,255}$", var.github_pages_verification_code))
    error_message = "github_pages_verification_code must be the code alone (letters, digits, hyphens or underscores) as GitHub shows it, without quotes or spaces."
  }

  validation {
    condition     = var.github_pages_verification_code == null || (var.github_pages_owner != null && var.zone_name != null)
    error_message = "github_pages_verification_code needs github_pages_owner and zone_name: the record is named _github-pages-challenge-<owner>.<zone_name>."
  }
}

# ---------------------------------------------------------------------------------------
# Bluesky handles
# ---------------------------------------------------------------------------------------

variable "bluesky_handles" {
  description = "Bluesky handles verified by DNS, as a map from handle hostname (in the zone) to the account's DID. Each entry creates the TXT record _atproto.<handle> with the value did=<DID>."
  type        = map(string)
  default     = {}
  nullable    = false

  validation {
    condition     = alltrue([for h in keys(var.bluesky_handles) : can(regex("^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z]([a-z0-9-]{0,61}[a-z0-9])?$", h)) && length(h) <= 244])
    error_message = "Each bluesky_handles key must be a lowercase, fully qualified hostname such as \"show.example.com\" (at most 244 characters, so _atproto. still fits)."
  }

  validation {
    condition     = alltrue([for h in keys(var.bluesky_handles) : try(h == var.zone_name || endswith(h, ".${var.zone_name}"), false)])
    error_message = "Each bluesky_handles key must be zone_name itself or a name under it, and zone_name must be set: the TXT record can only be created in this zone."
  }

  validation {
    condition     = alltrue([for d in values(var.bluesky_handles) : can(regex("^did:(plc:[a-z2-7]{24}|web:[a-z0-9]([a-z0-9.-]*[a-z0-9])?)$", d))])
    error_message = "Each bluesky_handles value must be the account's DID: \"did:plc:\" followed by 24 characters a-z or 2-7, or \"did:web:\" followed by a hostname. The Bluesky app shows it, after \"did=\", in the TXT value it asks for when you change to a domain handle."
  }
}

# ---------------------------------------------------------------------------------------
# Any other record
# ---------------------------------------------------------------------------------------

variable "extra_records" {
  description = "Other records in the zone, keyed by a short stable name you choose (the key is the record's address in state, so renaming it replaces the record). TXT content is wrapped in double quotes if it is not already."
  type = map(object({
    name     = string
    type     = string
    content  = string
    ttl      = optional(number, 1)
    proxied  = optional(bool, false)
    priority = optional(number)
    comment  = optional(string)
  }))
  default  = {}
  nullable = false

  validation {
    condition     = alltrue([for k in keys(var.extra_records) : can(regex("^[a-z0-9][a-z0-9_-]{0,62}$", k))])
    error_message = "Each extra_records key must be 1 to 63 lowercase letters, digits, hyphens or underscores, starting with a letter or digit (for example \"mail-mx\")."
  }

  validation {
    condition     = alltrue([for r in values(var.extra_records) : can(regex("^(_?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z]([a-z0-9-]{0,61}[a-z0-9])?$", r.name))])
    error_message = "Each extra_records name must be a lowercase, fully qualified hostname such as \"www.example.com\" (labels may start with an underscore, as in \"_dmarc.example.com\"). Wildcards are refused: GitHub warns they invite domain takeover."
  }

  validation {
    condition     = alltrue([for r in values(var.extra_records) : try(r.name == var.zone_name || endswith(r.name, ".${var.zone_name}"), false)])
    error_message = "Each extra_records name must be zone_name itself or a name under it, and zone_name must be set."
  }

  validation {
    condition     = alltrue([for r in values(var.extra_records) : contains(["A", "AAAA", "CNAME", "MX", "TXT", "NS"], r.type)])
    error_message = "Each extra_records type must be one of A, AAAA, CNAME, MX, TXT or NS (uppercase). Types whose value has several fields (CAA, SRV and others) need their own resource with a data block."
  }

  validation {
    condition     = alltrue([for r in values(var.extra_records) : r.type != "MX" || r.priority != null])
    error_message = "An extra_records entry of type MX needs a priority (lower is preferred), for example priority = 10."
  }

  validation {
    condition     = alltrue([for r in values(var.extra_records) : !r.proxied || contains(["A", "AAAA", "CNAME"], r.type)])
    error_message = "Only A, AAAA and CNAME records can be proxied. Set proxied = false for this extra_records entry."
  }

  validation {
    condition     = alltrue([for r in values(var.extra_records) : r.ttl == 1 || (!r.proxied && r.ttl >= 60 && r.ttl <= 86400)])
    error_message = "An extra_records ttl must be 1 (automatic) or between 60 and 86400 seconds, and a proxied record must use 1."
  }

  validation {
    condition     = alltrue([for r in values(var.extra_records) : length(trimspace(r.content)) > 0])
    error_message = "Each extra_records entry needs a non-empty content."
  }

  validation {
    condition = var.site_hostname == null || alltrue([
      for r in values(var.extra_records) : r.name != var.site_hostname || (
        !contains(["A", "AAAA", "CNAME"], r.type) && var.site_hostname == var.zone_name
      )
    ])
    error_message = "An extra_records entry cannot be at site_hostname when it is an A, AAAA or CNAME record (GitHub refuses to issue a certificate when other address records are present), nor at all when site_hostname is a subdomain (its CNAME must stand alone)."
  }
}

# ---------------------------------------------------------------------------------------
# Redirects
# ---------------------------------------------------------------------------------------

variable "redirects" {
  description = "Hostnames in the zone that redirect elsewhere, keyed by a short stable name you choose (the key is the rule's ref and the placeholder record's address in state). Each gets a proxied placeholder A record and one rule in the zone's Single Redirects ruleset."
  type = map(object({
    hostname    = string
    target_url  = string
    status_code = number
    # Carry the request's path and query string over to the target: /x?y on the hostname
    # goes to <target_url>/x?y. When false, every request goes to target_url exactly.
    keep_path_and_query = optional(bool, false)
  }))
  default  = {}
  nullable = false

  validation {
    condition     = alltrue([for k in keys(var.redirects) : can(regex("^[a-z0-9][a-z0-9_-]{0,62}$", k))])
    error_message = "Each redirects key must be 1 to 63 lowercase letters, digits, hyphens or underscores, starting with a letter or digit (for example \"apex\")."
  }

  validation {
    condition     = alltrue([for r in values(var.redirects) : can(regex("^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z]([a-z0-9-]{0,61}[a-z0-9])?$", r.hostname))])
    error_message = "Each redirects hostname must be a lowercase, fully qualified hostname such as \"example.com\" or \"old.example.com\": no scheme, no path, no trailing dot, no wildcard."
  }

  validation {
    condition     = alltrue([for r in values(var.redirects) : try(r.hostname == var.zone_name || endswith(r.hostname, ".${var.zone_name}"), false)])
    error_message = "Each redirects hostname must be zone_name itself or a name under it, and zone_name must be set."
  }

  validation {
    condition     = alltrue([for r in values(var.redirects) : try(r.hostname == var.zone_name || can(regex("^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$", trimsuffix(r.hostname, ".${var.zone_name}"))), true)])
    error_message = "A redirects hostname must be the apex or one level below it (\"old.example.com\", not \"a.old.example.com\"): Cloudflare's Universal SSL certificate covers only those, so a deeper name would fail over HTTPS before the redirect runs."
  }

  validation {
    condition     = length(distinct([for r in values(var.redirects) : r.hostname])) == length(var.redirects)
    error_message = "Each hostname may appear in redirects only once: one hostname, one redirect."
  }

  validation {
    condition     = alltrue([for r in values(var.redirects) : can(regex("^https?://[a-z0-9]([a-z0-9.-]{0,251}[a-z0-9])?(:[0-9]{1,5})?(/[^\\s\"\\\\]*)?$", r.target_url))])
    error_message = "Each redirects target_url must be an absolute http or https URL with a lowercase host, such as \"https://example.net/page\", with no spaces, double quotes or backslashes."
  }

  validation {
    condition     = alltrue([for r in values(var.redirects) : try(regex("^https?://([^/:]+)", r.target_url)[0] != r.hostname, true)])
    error_message = "A redirects target_url must not be on the redirect's own hostname: the rule matches every request to that hostname, so it would redirect to itself forever."
  }

  validation {
    condition     = alltrue([for r in values(var.redirects) : !r.keep_path_and_query || !can(regex("[?#]", r.target_url))])
    error_message = "A redirects target_url with keep_path_and_query = true must not have its own query string or fragment: the request's path is appended to it."
  }

  validation {
    condition     = alltrue([for r in values(var.redirects) : contains([301, 302, 307, 308], r.status_code)])
    error_message = "Each redirects status_code must be 301 or 308 (permanent: browsers cache it, possibly indefinitely) or 302 or 307 (temporary). Prefer a temporary code for anything that may change."
  }

  validation {
    condition     = var.site_hostname == null || alltrue([for r in values(var.redirects) : r.hostname != var.site_hostname])
    error_message = "A redirects hostname cannot be site_hostname: the site's records and the redirect's placeholder record would be at the same name. Remove one of them."
  }

  validation {
    condition = alltrue([
      for r in values(var.redirects) : alltrue([
        for e in values(var.extra_records) : !(e.name == r.hostname && contains(["A", "AAAA", "CNAME"], e.type))
      ])
    ])
    error_message = "A redirects hostname cannot also have an A, AAAA or CNAME record in extra_records: the redirect creates its own proxied placeholder address record there. Other types (MX, TXT) at the same name are fine."
  }
}
