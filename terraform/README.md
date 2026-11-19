# Cloudflare DNS

Terraform configuration for the show's DNS records in the existing Cloudflare zone
`simcluster.tv`. It is built to grow: today it manages DNS only, and a Cloudflare Pages
project can be added later without rewriting the records (see "Moving the site to
Cloudflare Pages").

What it can manage, each piece only when its variables are set:

- the site's hostname pointing at GitHub Pages: one CNAME for a subdomain, or GitHub's four
  A and four AAAA records for the apex, chosen from `site_hostname` and `zone_name`;
- GitHub's domain verification TXT record;
- Bluesky handle verification TXT records, one per handle;
- any other record, through `extra_records`.

What it does not manage: the zone itself (it is referenced by `zone_id`), the domain
registration, the zone's settings (SSL/TLS mode, caching), and anything at GitHub or Bluesky.
With no variables set, the plan is empty.

Secrets are kept apart from configuration. The configuration, the real variable values
included, is committed in `terraform.tfvars`: hostnames and DIDs are public in DNS, and the
zone id is an identifier that grants nothing without a token. The only secret is the Cloudflare API token, which is read from the
`CLOUDFLARE_API_TOKEN` environment variable and never written in this folder.

Files:

| file | holds |
|---|---|
| `providers.tf` | the `terraform` block, the provider pin, the (default, local) backend, the provider |
| `variables.tf` | every input, with its validation |
| `terraform.tfvars` | the show's configuration, committed, with every variable shown and commented |
| `dns.tf` | the records, and the seam between the site's hostname and its host |
| `outputs.tf` | `site_url`, `github_pages_custom_domain`, `records` |
| `imports.tf` | commented `import` blocks for adopting records that already exist |
| `backend.tf.example` | remote state on Cloudflare R2, ready to rename |
| `tests/dns.tftest.hcl` | every case, against a mocked provider, independent of `terraform.tfvars` |
| `tests/committed.tftest.hcl` | what the committed `terraform.tfvars` plans |
| `.terraform.lock.hcl` | the provider version and checksums; committed |

Ignored by git: `.terraform/`, state files (`*.tfstate*`), plan files, and every
`*.tfvars` or `*.tfvars.json` other than `terraform.tfvars`, which can hold local
overrides (for example `local.auto.tfvars` while trying a change).

## Running Terraform

From the repository root, with the token in `.secrets` (see below):

```sh
npm run terraform -- init
npm run terraform -- plan
npm run terraform -- apply
```

`npm run terraform -- <args>` loads `.secrets` and runs `terraform -chdir=terraform <args>`.
Plain `terraform` from this folder works too, with the token exported in the shell:

```sh
read -rs CLOUDFLARE_API_TOKEN && export CLOUDFLARE_API_TOKEN
terraform plan
```

The rest of this README writes commands as `terraform <args>`; either form runs them.

## Where things stand

- The zone `simcluster.tv` is on Cloudflare and is referenced, not managed.
- One record is applied and verified: the Bluesky handle `latecluster.simcluster.tv`,
  `cloudflare_dns_record.bluesky_handle["latecluster.simcluster.tv"]`, the TXT record
  `_atproto.latecluster.simcluster.tv`. `tests/committed.tftest.hcl` asserts that this is
  the only record the committed configuration plans.
- The site's hostname is not chosen yet: the owner is deciding between the apex and a
  subdomain, so the site variables in `terraform.tfvars` are commented out.
- State is local: `terraform.tfstate` exists only on the owner's machine. Moving it to R2
  is the next sensible step ("Remote state on R2"). Until then, back it up; if it is lost,
  see "Recovering lost state".

## Setting up on a machine

You need Terraform 1.11 or later.

1. **Create the API token**, if you do not have one. In the Cloudflare dashboard, open My
   Profile, API Tokens, Create Token, and start from the "Edit zone DNS" template or a
   custom token with:
   - Permissions: Zone, DNS, Edit.
   - Zone Resources: Include, Specific zone, `simcluster.tv`.

   Nothing else is needed: the configuration takes the zone id as a variable, so it never
   reads the zone. The token is shown once.

2. **Put it in `.secrets`** at the repository root, which git ignores. Copy the template if
   the file does not exist yet, and fill in `CLOUDFLARE_API_TOKEN=`:

   ```sh
   cp .secrets.example .secrets
   ```

3. **Initialize:**

   ```sh
   npm run terraform -- init
   ```

4. **Plan**, and read it. On the machine that holds the state it should report no changes.
   On a machine without the state it wants to create the handle record, which already
   exists: do not apply, and see "Recovering lost state" (or move the state to R2 first,
   from the machine that has it, and use it from everywhere).

   ```sh
   npm run terraform -- plan
   ```

5. **Changing the configuration** is an edit to `terraform.tfvars`, a plan, an apply, and a
   commit of the file. `terraform test` (and CI) checks the committed values first;
   `tests/committed.tftest.hcl` lists the records they must plan, so update it in the same
   commit.

## Pointing the site at GitHub Pages

GitHub's documentation asks for the custom domain to be added in the repository's Pages
settings before the DNS records point at GitHub, so that nobody else can claim the hostname
in between. The steps follow that order: the verification record first, then the custom
domain at GitHub, then the site's records.

1. **Choose the hostname.** A subdomain such as `show.simcluster.tv` is the simplest: one
   CNAME, and the rest of the domain is untouched. The apex (`simcluster.tv` itself) works
   too and gets GitHub's address records instead; GitHub also recommends a `www` CNAME to
   `<owner>.github.io` beside an apex, which `extra_records` can hold.

2. **Get GitHub's verification code.** In the settings of the GitHub user or organization
   that owns the repository (not the repository's settings), open Pages, add a verified
   domain, and enter `simcluster.tv`. GitHub shows a TXT record named
   `_github-pages-challenge-<owner>.simcluster.tv`. In `terraform.tfvars`, uncomment
   `github_pages_owner` (expected to be `kumavis`) and set
   `github_pages_verification_code` to the value. Leave `site_hostname` commented.

3. **Plan and apply.** The plan should add the verification TXT record and nothing else.
   Then press Verify on GitHub's page; DNS can take a while to propagate, so if
   verification fails at first, try again later. Update `tests/committed.tftest.hcl` and
   commit.

4. **Set the custom domain in the repository.** In the repository's Settings, Pages, the
   source must be "GitHub Actions" (that is how `deploy.yml` publishes). Enter the hostname
   under Custom domain and save. GitHub then runs a DNS check, which fails until the next
   step is applied. No `CNAME` file is needed in `dist/`: GitHub ignores it when a site is
   published from an Actions workflow.

5. **Point the hostname at GitHub.** Uncomment `site_hostname` and set it, then plan and
   apply. A subdomain plans one CNAME to `<owner>.github.io`; the apex plans four A and four
   AAAA records. Keep `site_proxied = false` for now. Update the committed test and commit.

6. **Wait for the certificate and enforce HTTPS.** Once GitHub's DNS check passes, it
   requests a certificate from Let's Encrypt; GitHub says this can take up to an hour.
   Then tick "Enforce HTTPS" in the repository's Pages settings. If the certificate does
   not appear, remove the custom domain, add it again and save, which restarts the process.

7. **Record the URL and rebuild the pilot.** Put the output into `siteUrl` in
   `show.config.json` at the repository root:

   ```sh
   npm run terraform -- output -raw site_url    # for example https://show.simcluster.tv/
   ```

   Then, from the repository root, rebuild the pilot once so its Open Graph tags (the
   link preview's image and page URL) become absolute, check it and commit both:

   ```sh
   npm run build -- 1
   npm run verify
   ```

   Episodes built from now on pick up `siteUrl` by themselves. The archive page does not
   need this: `deploy.yml` reads the site's URL from the Pages configuration on every
   deploy.

More Bluesky handles are more entries in `bluesky_handles`: apply, then change the
account's handle to the domain in the Bluesky app and let it verify.

### Proxied or DNS only

`site_proxied` defaults to `false` (DNS only, the grey cloud). With the proxy on, public DNS
answers with Cloudflare's addresses instead of GitHub's, so GitHub's DNS check and its
certificate request no longer see the records GitHub documents, and GitHub's documentation
does not cover proxies at all. DNS only is the configuration GitHub documents, and it lets
GitHub issue and renew its certificate without surprises.

Proxying adds Cloudflare's cache, analytics and firewall in front of the site. If you want
that, turn it on only after GitHub has issued the certificate and Enforce HTTPS works, and
set the zone's SSL/TLS encryption mode to Full (strict) first: in Flexible mode Cloudflare
talks to GitHub over plain HTTP, GitHub redirects to HTTPS, and Cloudflare documents that
this loops. Renewal still goes through GitHub; I found no GitHub documentation on renewing
behind a proxy, so if HTTPS breaks months later, switching back to DNS only is the first
thing to try.

## Variables

All are optional. Hostnames are fully qualified and lowercase, never `@` or a bare label.

| variable | type | default | what it does |
|---|---|---|---|
| `zone_id` | string | null | The existing zone's 32-character id. Required once any record is set. |
| `zone_name` | string | null | The zone's domain, such as `example.com`. Decides apex or subdomain, and every hostname must be in it. |
| `site_hostname` | string | null | The site's hostname. Equal to `zone_name`: apex, address records. Under it: one CNAME. |
| `site_target` | string | `"github_pages"` | Who hosts the site. Only `github_pages` exists; `cloudflare_pages` is the planned second. |
| `site_proxied` | bool | false | Whether the site's records go through Cloudflare's proxy. See above. |
| `github_pages_owner` | string | null | The GitHub user or organization, without `.github.io`. Required for a GitHub Pages site and for verification. Lowercased in records. |
| `github_pages_verification_code` | string | null | GitHub's verification code. Creates TXT `_github-pages-challenge-<owner>.<zone_name>`. |
| `bluesky_handles` | map(string) | `{}` | Handle hostname to DID (`did:plc:...` or `did:web:...`). Creates TXT `_atproto.<handle>` with `did=<DID>`. |
| `extra_records` | map(object) | `{}` | Other records, keyed by a short name you choose. Fields below. |

`extra_records` fields: `name` (hostname in the zone; labels may start with `_`),
`type` (A, AAAA, CNAME, MX, TXT or NS), `content`, `ttl` (default 1, meaning automatic, or
60 to 86400), `proxied` (default false; A, AAAA and CNAME only, with ttl 1), `priority`
(required for MX), `comment`. TXT content is wrapped in double quotes unless it already is,
because that is how Cloudflare stores TXT strings. The key is the record's address in state,
`cloudflare_dns_record.extra["<key>"]`, so renaming a key replaces the record. Wildcards are
refused, because GitHub warns they invite domain takeover. An extra record may not be an A,
AAAA or CNAME at the site's hostname, nor anything at a subdomain site's hostname: GitHub
will not issue a certificate with other address records present, and a CNAME must stand
alone. Records whose value has several fields (CAA, SRV and others) need their own
`cloudflare_dns_record` resource with a `data` block. If you ever add a CAA record, one must
allow `letsencrypt.org`, or GitHub's certificate fails.

Outputs: `site_url` (with a trailing slash, for `show.config.json`),
`github_pages_custom_domain` (what to type in the repository's Pages settings), and
`records` (every managed record by address, with name, type, content and proxied).

## Adopting records that already exist

If the zone already has a record that this configuration would create, apply fails with a
"record already exists" error. Import the record instead, so Terraform takes it over in
place:

1. Set the variables so the configuration describes the record, and run `terraform plan`.
   The plan names the address it wants to create, for example
   `cloudflare_dns_record.site["CNAME"]` or `cloudflare_dns_record.extra["mail-mx"]`.

2. Find the record's id. The dashboard does not show it, so ask the API with the same
   token (it can read records: Terraform reads them with it on every plan). Load it into
   the shell first, for example with `set -a; . ./.secrets; set +a` from the repository
   root, or `read -rs CLOUDFLARE_API_TOKEN && export CLOUDFLARE_API_TOKEN`:

   ```sh
   curl -s -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     "https://api.cloudflare.com/client/v4/zones/0da61adff2a379b4aca38f85be7f3d10/dns_records?per_page=100" |
     jq '.result[] | {id, type, name, content}'
   ```

   A zone with more than 100 records needs `&page=2` and so on.

3. In `imports.tf`, uncomment the matching block, set `to` to the address from step 1 and
   put the id after the zone id: `id = "${var.zone_id}/<record id>"`.

4. Run `terraform plan`. It should say the record will be imported, and at most update it
   in place (for example to add the comment). If it wants to destroy and create it, the
   variables do not match the record; fix them before applying.

5. `terraform apply`. The import block can then be deleted.

For the apex, any A, AAAA, ALIAS or CNAME record at the zone name that is not one of
GitHub's addresses (a registrar's parking page, for example) must go: GitHub will not issue
a certificate while it exists. Delete it in the dashboard, or import it under one of the
`site["A ..."]` addresses so Terraform rewrites it.

## Recovering lost state

While state is local, losing `terraform.tfstate` loses nothing in DNS: the records stay as
they are, but Terraform no longer knows it manages them, and a plan wants to create them
again (apply would fail with "record already exists"). Recover by importing each one:

1. Find the record ids (step 2 of "Adopting records that already exist"). For the handle,
   look for the TXT record `_atproto.latecluster.simcluster.tv`.
2. In `imports.tf`, uncomment the recovery block for the handle, check its id against the
   API, and add one block per other record the configuration manages by then.
3. `terraform plan` must show only imports (and at most in-place updates). Apply.
4. Comment the blocks out again, and move the state to R2 so this does not recur.

## Remote state on R2

State is local today, in `terraform.tfstate` on the owner's machine, ignored by git. Until it
moves, keep a copy somewhere safe outside the repository. Moving it to Cloudflare R2 makes it
shared, so another machine (or a future CI job) plans against the same state:

1. Create an R2 bucket in the dashboard, for example `example-terraform-state`. Leave it
   private.
2. From the R2 overview in the dashboard, create an R2 API token with Object Read and
   Write, scoped to that bucket. Note its Access Key ID and Secret Access Key, and your account id.
3. Export the credentials in your shell, never in a file:

   ```sh
   export AWS_ACCESS_KEY_ID=...        # the R2 token's Access Key ID
   export AWS_SECRET_ACCESS_KEY=...    # the R2 token's Secret Access Key
   ```

4. Rename `backend.tf.example` to `backend.tf` and replace the bucket name and
   `ACCOUNT_ID`. To keep the account id out of git, delete the `endpoints` line and
   `export AWS_ENDPOINT_URL_S3=https://<account id>.r2.cloudflarestorage.com` instead.
5. Migrate, and answer yes when asked to copy the existing state:

   ```sh
   terraform init -migrate-state
   ```

   (`-reconfigure`, which some guides show, starts from empty remote state and does not
   copy anything.)
6. `terraform plan` must report no changes. Then delete the local `terraform.tfstate` and
   `terraform.tfstate.backup`.

What R2 gives you as a backend: private storage that a CI runner and other machines can
share, through Terraform's standard S3 backend, with credentials kept out of the
repository.

State locking: with `use_lockfile = true`, Terraform 1.11 and later (including 1.14) lock by
writing a `.tflock` object with a conditional PUT (`If-None-Match: *`) that fails if the
lock already exists. R2's S3 compatibility page lists `If-None-Match` on PutObject as
implemented and evaluated atomically, so locking should work. I have not been able to test
it against a real bucket. DynamoDB locking, the older mechanism, does not exist on R2. If a
run is killed, the lock object can stay behind; `terraform force-unlock <id>` removes it.

What it does not give you: object versioning (R2 does not implement S3 bucket versioning),
so there is no automatic history of earlier states to roll back to, and KMS encryption
options do not apply. Take a copy (`terraform state pull > backup.tfstate`, kept outside
the repository) before risky changes.

## Moving the site to Cloudflare Pages

GitHub Pages limits a published site to 1 GB. The site's records already go through a seam
in `dns.tf`: `local.site_targets` says, per host, where a subdomain's CNAME points and which
address records an apex gets, and the record resource only reads the selected entry.
Moving is therefore new resources and new variables, not a rewrite.

What would be added:

- `cloudflare_pages_project` with `account_id`, `name` and `production_branch`, and no
  `source` or `build_config`: the site is uploaded as it is committed (direct upload), not
  built by Cloudflare.
- `cloudflare_pages_domain` with `account_id`, `project_name` and `name = var.site_hostname`.
  It does not create the DNS record, so the site's record must depend on it: Cloudflare
  warns that a CNAME added before the domain is attached to the project resolves to a 522
  error.
- A `cloudflare_pages` entry in `local.site_targets` whose CNAME is the project's
  `<project>.pages.dev` subdomain and whose `apex_addresses` is null (an apex gets a CNAME,
  which Cloudflare flattens; this works because the zone is on Cloudflare in the same
  account).
- Variables for the account id and the project name, and `"cloudflare_pages"` added to the
  `site_target` validation. Set `site_proxied = true` with that target: Cloudflare proxies
  the CNAMEs it creates for Pages.
- The token gains Account, Cloudflare Pages, Edit, scoped to the one account.

How `deploy.yml` would change, in outline: the checkout, Node, `npm run verify` and
`npm run site` steps stay. `actions/configure-pages`, `upload-pages-artifact` and
`deploy-pages` go, along with the `pages` and `id-token` permissions and the
`github-pages` environment. `npm run site` then takes its URL from `siteUrl` in
`show.config.json` (its fallback when `SITE_URL` is empty). The deploy step becomes
`cloudflare/wrangler-action@v4` running `pages deploy dist --project-name=<project>`, with
a separate token (Account, Cloudflare Pages, Edit only) and the account id stored as
repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Once Cloudflare
serves the site, switch GitHub Pages off and remove its custom domain; the verification
TXT record can stay.

What stays the same: builds are committed under `dist/`, so nothing is built in CI on
either host and no episode is rebuilt by the move. Episode paths stay `/episodes/<id>/`. If
the hostname does not change, `siteUrl` does not change and the committed Open Graph tags
stay correct.

How the limits compare, at about 14 MB and 50 files per episode with no file over 2 MB:

| | GitHub Pages | Cloudflare Pages Free | Cloudflare Pages paid plans |
|---|---|---|---|
| limit that binds | 1 GB per published site | 20,000 files per site | 100,000 files per site |
| largest single file | (no separate limit) | 25 MiB | 25 MiB |
| episodes that fit | about 70 (1 GB / 14 MB) | about 400 (20,000 / 50) | about 2,000 |
| at one a week | about 1.4 years | about 7.5 years | decades |

Cloudflare states no total size limit for a Pages site, only the file count and the
per-file size, so for this show the file count is what to watch, and 2 MB files are far
under 25 MiB. The site generator's own files (the archive page, `episodes.json`, `latest/`,
`site-assets/`) take a few more from the same budget. One thing the move does not fix: the
repository. Every episode is still committed under `dist/`, and GitHub recommends Pages
source repositories stay under 1 GB too, so the repository grows at the same rate on
either host.

## Tests and checks

```sh
terraform fmt -check -recursive
terraform init -backend=false
terraform validate
terraform test
```

The tests plan every case against a mocked Cloudflare provider: no token, no API calls,
only the provider download. `terraform test` loads the committed `terraform.tfvars` into
every run, so `tests/dns.tftest.hcl` resets every variable to its default in a file-level
`variables` block and each run sets only what it needs; `tests/committed.tftest.hcl` sets
nothing and so tests the committed values. `.github/workflows/terraform.yml` runs the same four commands
on pull requests that touch `terraform/`. It never plans against Cloudflare or applies; a
plan-and-apply workflow needs remote state and a token secret first, and is a later step.

When upgrading the provider within 5.x, refresh the checksums for every platform CI and
the owner use, and commit the lock file:

```sh
terraform init -upgrade
terraform providers lock -platform=linux_amd64 -platform=linux_arm64 -platform=darwin_arm64 -platform=darwin_amd64 -platform=windows_amd64
```
