# The committed configuration itself: terraform.tfvars, which terraform test loads
# automatically. This file sets no variables, so a bad edit to the real values (a typo in
# the DID, a handle outside the zone, a record switched on by accident) fails here, in CI,
# before anyone runs a plan against Cloudflare. Mocked provider: no token, no API calls.
#
# When terraform.tfvars changes on purpose, change the expected records below with it.

mock_provider "cloudflare" {}

run "committed_configuration_plans_only_the_handle_record" {
  command = plan

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
    }
    error_message = "The committed configuration must plan exactly the Bluesky handle record for latecluster.simcluster.tv."
  }

  assert {
    condition     = cloudflare_dns_record.bluesky_handle["latecluster.simcluster.tv"].zone_id == "0da61adff2a379b4aca38f85be7f3d10"
    error_message = "The handle record must be in the simcluster.tv zone."
  }

  assert {
    condition     = output.site_url == null
    error_message = "No site hostname is chosen yet, so site_url must be null."
  }
}
