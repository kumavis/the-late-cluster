# The terraform block, the backend and the providers.
#
# State is local (terraform.tfstate next to this file, ignored by .gitignore) until the
# owner moves it to Cloudflare R2: rename backend.tf.example to backend.tf and follow
# "Remote state on R2" in README.md. There is deliberately no backend block here, so the
# default local backend is used.

terraform {
  # 1.11: S3-native state locking (use_lockfile) is generally available, which the R2
  # backend example relies on. 1.9 or later is also needed for variable validations that
  # refer to other variables, and 1.7 for the mocked provider in tests/.
  required_version = ">= 1.11.0, < 2.0.0"

  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      # Major version 5 renamed cloudflare_record to cloudflare_dns_record and changed its
      # arguments (content instead of value). Stay on 5.x; a new major needs a review.
      version = "~> 5.29"
    }
  }
}

# Authentication is the CLOUDFLARE_API_TOKEN environment variable only, loaded locally from
# .secrets at the repository root by npm run terraform -- <args>. Never put the token in
# this file or in a .tfvars file. README.md says which permissions the token needs.
provider "cloudflare" {}
