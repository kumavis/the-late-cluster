# The show's DNS configuration, committed. Nothing in this file is secret: hostnames and
# DIDs are public in DNS, and the zone id is an identifier that grants nothing without a
# token. The only secret, CLOUDFLARE_API_TOKEN, is read
# from the environment (locally from .secrets at the repository root, through
# npm run terraform -- <args>). Never put it here.
#
# Terraform loads this file automatically. Other *.tfvars files in this folder are ignored
# by git and can hold local overrides. tests/committed.tftest.hcl checks what this file
# plans, so CI fails on a bad edit before anyone runs a plan.
#
# Every variable is optional; a commented one creates nothing. Hostnames are fully
# qualified and lowercase, never "@" or a bare label. variables.tf and README.md describe
# each variable in full.

# --- The zone ------------------------------------------------------------------------
# The existing Cloudflare zone (its Overview page, "Zone ID") and its domain. Required as
# soon as any record below is set. The zone itself is not managed here.
zone_id   = "0da61adff2a379b4aca38f85be7f3d10"
zone_name = "simcluster.tv"

# --- The site --------------------------------------------------------------------------
# Not chosen yet: the owner is deciding between the apex (simcluster.tv itself, which gets
# GitHub's four A and four AAAA records) and a subdomain (one CNAME to <owner>.github.io).
# Follow README.md, "Pointing the site at GitHub Pages", when it is decided: the custom
# domain is set in the repository's Pages settings before this is applied.
# site_hostname = "<apex or subdomain of simcluster.tv>"

# Where the site is hosted. Only "github_pages" exists today.
# site_target = "github_pages"

# The GitHub user or organization that owns the repository, without ".github.io".
# Expected to be kumavis.
# github_pages_owner = "kumavis"

# Route the site through Cloudflare's proxy (orange cloud). Leave false until GitHub has
# issued the certificate and "Enforce HTTPS" is on; README.md explains the trade-off.
# site_proxied = false

# --- GitHub domain verification -------------------------------------------------------
# The code from "Add a verified domain" in the GitHub user or organization's Pages
# settings (not the repository's). Creates _github-pages-challenge-<owner>.<zone_name>.
# Needs github_pages_owner.
# github_pages_verification_code = "<code GitHub shows>"

# --- Bluesky handles --------------------------------------------------------------------
# Handle hostname => the account's DID. Creates TXT _atproto.<handle> "did=<DID>".
# Applied and verified.
bluesky_handles = {
  "latecluster.simcluster.tv" = "did:plc:zdobmviiuyfkc6xyylmpm2sf"
}

# --- Redirects -----------------------------------------------------------------------------
# Hostname => where every request to it goes. Each creates a proxied placeholder A record
# (192.0.2.1, no origin) and one rule in the zone's Single Redirects ruleset. Needs the
# token permission Zone, Single Redirect, Edit. A redirect hostname cannot be site_hostname,
# so when the show's site takes the apex, this entry goes.
redirects = {
  "bluesky-profile" = {
    hostname   = "simcluster.tv"
    target_url = "https://bsky.app/profile/latecluster.simcluster.tv"
    # 302 is temporary on purpose: the apex may host the show's own site later, and
    # browsers cache a permanent 301 or 308 indefinitely, so visitors who saw it would keep
    # going to Bluesky after the site moves in. Change to 301 only if this is for good.
    status_code         = 302
    keep_path_and_query = false
  }
  # www is not redirected. To add it, copy the entry above with hostname
  # "www.simcluster.tv" and a new key such as "www-bluesky-profile".
}

# --- Any other record --------------------------------------------------------------------
# Keyed by a short name of your choosing; the key is the record's address in state, so do
# not rename it casually. Types: A, AAAA, CNAME, MX, TXT, NS. ttl defaults to 1 (automatic),
# proxied to false. MX needs a priority. TXT content is quoted for you. Shapes:
# extra_records = {
#   "mail-mx" = {
#     name     = "simcluster.tv"
#     type     = "MX"
#     content  = "mail.example.net"
#     priority = 10
#   }
#   "spf" = {
#     name    = "simcluster.tv"
#     type    = "TXT"
#     content = "v=spf1 -all"
#     comment = "This domain sends no mail"
#   }
# }
