# Import blocks for records that existed in the zone before Terraform managed them.
#
# If a record this configuration would create already exists (for example a CNAME for the
# site made by hand in the dashboard), apply fails with "record already exists". Adopt it
# instead: uncomment the matching block, fill in its id, run terraform plan and check it
# says "1 to import" with no other change for that record, then apply. The block can be
# deleted after the apply that imports it; leaving it is harmless.
#
# The id is "<zone_id>/<dns_record_id>". README.md, "Adopting records that already exist",
# shows how to find a record's id. The address in "to" must match a record the variables
# produce, so set the variables first; terraform plan names the addresses.

# Recovery: the applied Bluesky handle record, if the local state is lost before it moves to
# R2 (README.md, "Recovering lost state"). The id was the record's id when it was created;
# check it against the API before importing.
# import {
#   to = cloudflare_dns_record.bluesky_handle["latecluster.simcluster.tv"]
#   id = "${var.zone_id}/1dab3bd093fd19b1037afeaac12419bc"
# }

# The site on a subdomain (one CNAME):
# import {
#   to = cloudflare_dns_record.site["CNAME"]
#   id = "${var.zone_id}/0123456789abcdef0123456789abcdef"
# }

# The site on the apex (one block per address; the key is "<type> <address>"):
# import {
#   to = cloudflare_dns_record.site["A 185.199.108.153"]
#   id = "${var.zone_id}/0123456789abcdef0123456789abcdef"
# }
# import {
#   to = cloudflare_dns_record.site["AAAA 2606:50c0:8000::153"]
#   id = "${var.zone_id}/0123456789abcdef0123456789abcdef"
# }

# GitHub's domain verification TXT record:
# import {
#   to = cloudflare_dns_record.github_pages_verification[0]
#   id = "${var.zone_id}/0123456789abcdef0123456789abcdef"
# }

# A Bluesky handle's _atproto TXT record (the key is the handle):
# import {
#   to = cloudflare_dns_record.bluesky_handle["show.example.com"]
#   id = "${var.zone_id}/0123456789abcdef0123456789abcdef"
# }

# Any other record, after describing it in extra_records (the key is yours):
# import {
#   to = cloudflare_dns_record.extra["mail-mx"]
#   id = "${var.zone_id}/0123456789abcdef0123456789abcdef"
# }
