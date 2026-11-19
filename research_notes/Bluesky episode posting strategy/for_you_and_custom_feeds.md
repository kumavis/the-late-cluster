# The community-run "For You" feed and other widely used Bluesky custom feeds: how they choose posts (as of Nov 2026)

Research date: 2026-11-19. Source confidence is noted inline. Social posts on bsky.app could not be read via fetch (JS-rendered), so several of the author's own statements are known only through search snippets or secondary write-ups.

## 1. Who runs the community "For You" feed, how big is it, and how does its algorithm work?

### Takeaway
"For You" is built and run single-handedly by the developer known as spacecowboy (@spacecowboy17.bsky.social). It is the most-liked custom feed on Bluesky: about 53.8K feed likes, and about 72K people load it daily (April 2026). It uses item-to-item collaborative filtering on likes. It takes the posts you liked (and reposted), finds other people who liked those same posts, and shows you what else those people liked recently. It does not use your follow graph, and it is not open source.

### Cited Findings
- **Author, infrastructure, scale.** The author's guest post on the AT Protocol blog (dated 22 Apr 2026) gives these figures (high confidence, primary source) — [Serving the For You Feed, atproto.com](https://atproto.com/blog/serving-the-for-you-feed):
  - About 72K users load the feed at least once a day.
  - Each user makes about 22 requests a day, for 15–25 QPS in total.
  - It runs as a single Go binary that consumes Jetstream, stores data in SQLite (main DB about 419GB) and serves the feed.
  - The hardware is a gaming PC in the author's home, with a small OVH VPS acting as a JWT-validating proxy.
  - It costs about $30/month in total.
- **Core logic, in the author's words.** "It finds people who liked the same posts as you, and shows you what else they've liked recently." The viewer's own likes are the starting signal — [atproto.com](https://atproto.com/blog/serving-the-for-you-feed)
- **Data retention and degraded mode.** Only the last 90 days of data are kept. Under heavy load the feed switches to cheaper algorithm parameters, which the author says cut computation by more than 10x "with minimal quality degradation" — [atproto.com](https://atproto.com/blog/serving-the-for-you-feed)
- **Feedback loop.** Likes on shown posts and "show more / show less" interactions are logged and fed back into the analysis — [atproto.com](https://atproto.com/blog/serving-the-for-you-feed)
- **Signals, per the official FAQ** (high confidence) — [foryou.club](https://foryou.club/):
  - It is "based only on your likes and reposts" and does not use who you follow.
  - The posts you write count as likes by you, the author.
  - "Show more like this" counts as a like.
  - "Show less like this" disconnects you from the people who liked that post and down-weights their likes.
  - It ignores your blocks and mutes; the FAQ suggests using "show less" instead.
- **Playground parameters** (high confidence; these describe the default playground, which may differ from production) — [foryou.club/playground](https://foryou.club/playground):
  - The three-step method is: posts you liked, then other users who liked them, then other posts those users liked.
  - By default only posts **published in the last 24 hours** are shown. The maximum age is adjustable.
  - A half-life setting demotes older posts.
  - A "diversify on metadata" option spreads apart posts from the same author, or posts that **quote the same post**.
- **Open-source status.** Not open source, and the author has "no immediate plans" to release the code. The logic is based on the author's earlier LinkLonk article recommender. Graze's personalization module and eurosky.social's "fu" feed are listed as projects inspired by it — [foryou.club](https://foryou.club/)
- **Paid tier ("Turbo").** Paid features include:
  - mixing in posts from your follows;
  - excluding followed accounts across feeds;
  - filtering out politics.

  A search snippet of an author post says a $5/month subscription allows excluding, or mixing in, posts from people you follow. That post was not fetched directly, so the price is medium confidence — [foryou.club](https://foryou.club/); [spacecowboy profile (via search)](https://bsky.app/profile/spacecowboy17.bsky.social)
- **Like-count and age filters.** A search snippet of an author post mentions filters for posts with too few or too many likes, and for post age. The thresholds are not known (medium-low confidence) — [spacecowboy post (via search)](https://bsky.app/profile/spacecowboy17.bsky.social/post/3lvhmdnxah22u)
- **Feed likes.** For You is ranked #1 by likes: 53,806 on blueskyfeeds.com and 53,811 on Agent Sky's list, which says it was last updated 19 Nov 2026 — [blueskyfeeds.com/feeds/top](https://blueskyfeeds.com/feeds/top); [useagentsky.com](https://useagentsky.com/bluesky-feeds)
- **Bluesky's endorsement.** Bluesky's official account has publicly promoted the feed as a personalized algorithmic feed based on your likes. This is known from a search snippet; the post's date could not be read — [bsky.app post](https://bsky.app/profile/bsky.app/post/3mbhel6ij7s2y)
- **Influence on Graze.** Graze's newsletter (4 Mar 2026) calls the feed a model for collaborative filtering on the Atmosphere and says it influenced Graze's open-source (MIT) personalization engine — [Graze newsletter](https://graze.leaflet.pub/3mgascfb6uc2e)
- **Sibling feeds by the same author.** These include "Videos For You", which runs as a separate service, plus Daylight For You (no NSFW), After Dark For You (NSFW only) and The Atmosphere Feed. The playground also has variants for "External links", "Papers", "Videos" and "Images" (excluding screenshots) — [atproto.com](https://atproto.com/blog/serving-the-for-you-feed); [foryou.club](https://foryou.club/); [playground](https://foryou.club/playground)

### Inferences
- **How a post becomes a candidate.** A post enters the pool by being liked by people whose like history overlaps with a viewer's. The mechanism is entirely engagement-driven: a post with zero likes cannot be recommended to anyone except through the author's own implicit "like". Early likes from people with distinctive, consistent taste matter more than raw follower count.
- **The window is short.** The default 24-hour age window and half-life decay mean most of a post's chance to reach this feed is in its first day. A weekly series probably needs each episode post to collect likes quickly after posting, rather than relying on a long tail.
- **Topic clusters form naturally.** Because recommendations flow through co-likers, a series with a consistent audience will tend to be shown to more people with the same tastes. In effect it builds its own taste cluster over time.

### Gaps
- No exact production values could be found for the maximum post age, the like thresholds, or the decay. The playground defaults (24h) may not match production.
- The author's own Bluesky posts and blog could not be fetched; only snippets were available.

## 2. Does For You include replies, quote posts, reposts, link posts and video?

### Takeaway
No primary source found in this session states the reply policy for For You. Quote posts are clearly eligible, since the diversification option groups "posts that quote the same post". Link posts and video are clearly handled, as there are dedicated "External links" and "Videos For You" variants. Reposts count as a like-like signal from the viewer, but the documentation does not say they are surfaced as items.

### Cited Findings
- **Reposts.** The FAQ says the feed is based on "your likes and reposts", so reposts are an input signal — [foryou.club](https://foryou.club/)
- **Quote posts.** The playground's diversify option spreads apart "posts that quote the same post", which implies quote posts appear as candidates — [foryou.club/playground](https://foryou.club/playground)
- **Links and video.** The playground offers "External links", "Papers", "Videos" and "Images" variants, and "Videos For You" is a separate production feed. This implies the main feed's candidate pool includes link-card and video posts, with the variants being filters on top — [foryou.club/playground](https://foryou.club/playground); [atproto.com](https://atproto.com/blog/serving-the-for-you-feed)
- **Replies.** A targeted search found no statement on replies, and neither the FAQ, the playground nor the atproto blog post mentions them — [search result summary; foryou.club](https://foryou.club/)

### Inferences
- **Do not count on replies.** It cannot be confirmed whether replies are eligible. Even if they are, a reply buried in an old self-thread would usually collect few likes, and the item would be dated by its own creation time. The real issue is whether the feed renders replies in context, which is unverified. The conservative assumption is that a reply on an old thread is unlikely to surface. **Each episode should be a fresh top-level post.**
- **Recency is by post creation, probably.** With a 24h default age window, the "age" is presumably the age of the post itself, so a new reply would be "fresh". Whether it passes a reply filter is unknown.

### Gaps
- No confirmation of reply handling. The best ways to verify are to:
  - ask the author directly;
  - use the playground's "Explain" or "Filtered Posts" tools at foryou.club on a test reply.

## 3. Which other custom feeds have the largest audiences in 2026, and what are their inclusion rules?

### Takeaway
Feed likes are the only public popularity proxy. They are very concentrated:
- blueskyfeeds.com reports about 158K custom feeds, and about 90% have fewer than 10 likes.
- The top tier, after For You (about 53.8K), is Bluesky's own Popular With Friends (about 41.4K) and Discover (about 39.6K).
- Next come Artists: Trending (about 32.8K), Science (about 29.5K), SkyFeed's Mutuals (about 28.8K), Blacksky (about 28.1K), BookSky (about 25.7K), News (about 24K), OnlyPosts (about 21.2K) and Quiet Posters (about 16.7K).
- No dedicated tech, AI or programming feed reaches the top 40.

### Cited Findings
- **Top feeds by likes on blueskyfeeds.com.** The page says only "updated daily" and gives no timestamp. Descriptions are the directory's paraphrases — [blueskyfeeds.com/feeds/top](https://blueskyfeeds.com/feeds/top)

  | # | Feed | Run by | Likes | Description |
  |---|---|---|---|---|
  | 1 | For You | spacecowboy | 53,806 | Personalized feed based on your likes |
  | 2 | Popular With Friends | Bluesky (bsky.app) | 41,417 | Popular posts from follows and what they like |
  | 3 | Discover | Bluesky (bsky.app) | 39,636 | Bluesky's own Discover feed |
  | 4 | Artists: Trending | bsky.art | 32,824 | Trending image posts from artists |
  | 5 | Science | Bossett | 29,508 | Curated science feed |
  | 6 | Mutuals | SkyFeed | 28,829 | Posts from users who follow you back |
  | 7 | Blacksky | Rudy Fraser | 28,110 | Posts by Black users |
  | 8 | BookSky | Clarabelle | 25,706 | Books and reading; uses a book-related tag |
  | 9 | News | ændra | 24,006 | Headlines from verified news outlets, newest first |
  | 10 | OnlyPosts | SkyFeed | 21,184 | Follows' posts **without reposts or replies** |
  | 11 | Quiet Posters | Why (why.bsky.world) | 16,652 | Posts from your quieter follows |
  | 12 | For You | skygaze | 15,684 | Learns what you like |
  | 17 | What's Hot Classic | Bluesky | 10,353 | The original What's Hot feed |
  | 20 | Game Dev | Trezy | 9,308 | Game development posts |
  | 22 | Trending Brasil | — | 8,937 | Brazilian posts with **1,000+ likes in 24h** |
  | 23 | The 'Gram | Why | 8,274 | Pictures from follows |
  | 24 | Mentions | — | 7,718 | **Replies, mentions and quotes of you** |
  | 27 | Video | Bluesky | 7,139 | **Trending videos** |
  | 31 | Mutuals | Bluesky | 5,444 | Posts from mutual follows |
  | 37 | Discover | SkyFeed | 4,476 | Posts based on your likes |
  | 43 | Catch Up | SkyFeed | 4,102 | **Most popular posts from the last 24 hours** |
  | 44 | Latest From Follows | Why | 3,904 | Most recent posts from follows |

- **Agent Sky's list.** Agent Sky pulled 4,039 feeds from the public API, gives the top 10 by likes, and says it was last updated 19 Nov 2026. Its counts match the table above within a few likes. Its topic totals are Tech 152 feeds, AI 176 and Programming 116, but **no tech, AI or programming feed is in its top 40, and no video-specific feed is listed there** — [useagentsky.com/bluesky-feeds](https://useagentsky.com/bluesky-feeds)
- **Older numbers.** A 2025 analysis had lower figures (Popular With Friends 37,502; Discover 36,338). This shows slow growth in feed likes over 2025–26 — [bskyinfo.com](https://bskyinfo.com/blog/bluesky-feed-ecosystem-analysis-2025/)
- **Likes are only a rough proxy.** Feed likes are the closest thing to a subscriber count, but they are not usage. For You's 53.8K likes compare with about 72K daily users — [useagentsky.com](https://useagentsky.com/bluesky-feeds); [atproto.com](https://atproto.com/blog/serving-the-for-you-feed)
- **Skygaze's For You.** This second personalized feed has about 15.7K likes and is described as "learns what you like" — [blueskyfeeds.com](https://blueskyfeeds.com/feeds/top)

### Inferences
- **Feeds built from follow graphs only help with existing followers.** These include Popular With Friends, Mutuals, OnlyPosts, Quiet Posters, Latest From Follows and The 'Gram. OnlyPosts explicitly drops replies and reposts, so a top-level post qualifies and a reply in a thread does not.
- **Quiet Posters favours accounts that post rarely.** By design it shows follows who post rarely relative to others. A once-a-week series account would fit that profile well; the exact threshold is not documented here.
- **Engagement-threshold and trending feeds reward fast engagement.** Catch Up (most popular in the last 24h), What's Hot Classic, Trending Brasil (1,000+ likes in 24h) and the Video feed (trending videos) are only reachable by fast early engagement. Video posts have a dedicated Bluesky-run trending surface.
- **Topic feeds are a more realistic target for a niche series.** They usually match keywords, hashtags or curated author lists; Science, for example, is curated. Inclusion rules vary by feed and must be checked on each feed's description.

### Gaps
- No usage (daily viewers) numbers were found for any feed except For You.
- The exact inclusion rules for Popular With Friends and Discover are not published; Bluesky does not publish the ranking formula. The same is true of Quiet Posters' thresholds.
- No large tech, AI or software feed could be identified by name. The large ones exist only as numerous small feeds (hundreds of likes or fewer).

## 4. How feed generators work mechanically, and how hosted builders expose rules

### Takeaway
A feed generator indexes the network firehose (or Jetstream) itself and answers `getFeedSkeleton` with nothing but a list of post AT-URIs, optionally with metadata. The Bluesky AppView then hydrates and renders those posts. Each generator therefore decides its own rules on replies, quotes and embeds. In hosted builders such as SkyFeed, **removing replies is the default**.

### Cited Findings
- **The request–skeleton–hydration flow** — [atproto.com/guides/feeds](https://atproto.com/guides/feeds):
  - `getFeedSkeleton` requests come from the AppView on behalf of a user, authenticated by a JWT signed with the user's repo signing key.
  - The generator returns a skeleton: post URIs with optional metadata.
  - The AppView hydrates the posts.
  - Generators index as much or as little of the firehose (`com.atproto.sync.subscribeRepos`) as they want.
  - The docs suggest discarding data older than 48 hours unless the feed is for catching up on missed posts.
- **Feedback and identity** — [atproto.com/guides/feeds](https://atproto.com/guides/feeds):
  - Generators can optionally implement `app.bsky.feed.sendInteractions` to receive likes, reposts and shares, which is the "show more / show less" path.
  - Each feed is declared by a record in the creator's repository, which points at the service DID.
- **Replies are in the same stream.** The firehose's post collection includes replies and quotes in the same stream as top-level posts — [search summary of starter-template sources](https://docs.bsky.app/docs/starter-templates/custom-feeds)
- **The For You feed itself consumes Jetstream** (a JSON firehose) — [atproto.com](https://atproto.com/blog/serving-the-for-you-feed)
- **SkyFeed's builder** — [Southern Fried Science guide](https://www.southernfriedscience.com/a-quick-and-dirty-guide-to-making-custom-feeds-on-bluesky/); [Paul Musgrave guide](https://www.paulmusgrave.info/the-moderately-skilled-persons-guide-to-making-a-bluesky-feed/); [atproto.com SkyFeed feature](https://atproto.com/blog/feature-skyfeed):
  - New feeds include a default "Remove if item is Reply" block.
  - The creator must delete that block to include replies.
  - Remove blocks with an "Invert" option are used for other exclusions.
  - A secondary source claims a post-type filter (posts only, replies only, reposts only) in advanced settings. This conflicts with the block-based description and is low confidence — [wisechecker](https://wisechecker.com/?p=4680)
- **Bluesky Feed Creator (a separate hosted tool)** — [Bluesky Feed Creator newsletter, Jan 2025](https://buttondown.com/blueskyfeedcreator/archive/new-in-january-2025):
  - It excludes posts that quote or reply to a blocked author.
  - It has a search modifier that collects all posts quoting a given author.
- **Graze** — [Graze newsletter](https://graze.leaflet.pub/3mgascfb6uc2e); [Graze newsletter, "A world without Caesars"](https://graze-newsletter.beehiiv.com/p/a-world-without-caesars):
  - It offers list-based and filter-based feeds, including an example filtering for posts with at least five replies.
  - Since March 2026 it has an open-source personalization engine (Rust, Redis, ClickHouse) using co-liker weights.
  - For cold-start users, it blends popular, trending and discovery posts until they have a few dozen likes.
  - Its full rule documentation on replies, quotes and video was not found.

### Inferences
- **How post shapes are told apart** (general protocol knowledge, not fetched this session; verify against the `app.bsky.feed.post` lexicon in the bluesky-social/atproto repo):
  - A reply carries a `reply` field with root and parent references.
  - A quote post uses `app.bsky.embed.record`, or `recordWithMedia`.
  - A link card is `app.bsky.embed.external`.
  - Video is `app.bsky.embed.video`.
  - Images are `app.bsky.embed.images`.

  Feed code commonly drops replies with a simple "has a reply field" check. That is why "a reply to an old thread" is invisible to most topic, keyword and follow-based feeds.
- **Builder defaults decide most outcomes.** SkyFeed drops replies by default, and many community topic feeds are built with SkyFeed or Graze. The safe assumption is that **only top-level posts qualify** for most topic feeds. Quote posts and link, video or image posts generally qualify unless a feed explicitly filters them.

### Gaps
- Graze's and SkyFeed's current UI documentation on quote, embed and video rules was not retrieved.
- The Bluesky docs page (docs.bsky.app, which redirects to bsky.network) failed to load.

## 5. Is it practical for a publisher to run its own series feed, and how are such feeds discovered?

### Takeaway
Technically it is easy and cheap. A no-code SkyFeed or Graze feed can match a single account, list or hashtag, and a self-hosted generator only has to return URIs. Discovery is the hard part: about 90% of the roughly 158K custom feeds have fewer than 10 likes. No serial-publisher examples were found in this session.

### Cited Findings
- **Feed counts.** blueskyfeeds.com reports about 158K custom feeds, about 90% of them with fewer than 10 likes — [search summary of blueskyfeeds.com](https://blueskyfeeds.com/)
- **How people discover feeds.** People find feeds through directories (blueskyfeeds.com, Agent Sky, feeds.bluesky.com) and the in-app Feeds search. A feed's creator record lives in its owner's repository — [blueskyfeeds.com](https://blueskyfeeds.com/feeds/top); [useagentsky.com](https://useagentsky.com/bluesky-feeds); [atproto.com/guides/feeds](https://atproto.com/guides/feeds)
- **Cost.** Even a large personalized feed runs on hobbyist hardware for about $30/month. A single-account feed is trivial by comparison — [atproto.com](https://atproto.com/blog/serving-the-for-you-feed)
- **A one-person feed.** One developer reports building a personal "feed for one" and using Bluesky much more as a result. This is anecdotal — [Adam Wiggins](https://adamwiggins.com/posts/a-bluesky-feed-for-one/)

### Inferences
- **A series feed works best as an archive or index for existing fans.** It might list every episode post, for example via a hashtag or the account plus a keyword rule in SkyFeed, with replies kept off. It is unlikely to drive discovery on its own. Promotion would come from pinning it to the profile, linking it in episode posts, and listing it in directories.

### Gaps
- No documented examples were found of serial publishers (podcasts, newsletters, webcomics) running per-series feeds, or of their results.
- The in-app mechanics of feed pinning and profile feed tabs were not verified this session.

## 6. Is there published data on viewing share across Following, Discover and custom feeds?

### Takeaway
No. No authoritative public figure was found from Bluesky or a third party on how viewing splits across Following, Discover and custom feeds. Only proxies and anecdotes exist.

### Cited Findings
- **A small user study.** In a CHI 2026 field study of 15 Bluesky users (Jul–Aug 2025), 14 used Following, 6 used Discover and 5 used custom feeds. The sample is tiny and not representative — [BONSAI, arXiv 2509.10776v2](https://arxiv.org/html/2509.10776v2)
- **For You's daily users.** About 72K people use For You daily, against roughly 1M daily likers on the network (author's figure). This suggests the most popular third-party feed reaches only a few percent of active users — [atproto.com](https://atproto.com/blog/serving-the-for-you-feed)
- **Overall activity.** Bluesky's daily active users fell about 40% year over year as of Oct 2025, per Similarweb as reported by TechCrunch. This is context only — [TechCrunch (via search)](https://techcrunch.com/?p=3086636)
- **Unsourced claims.** Claims that Following is "the feed most people use" or that custom feeds "drive most discovery" come from blogs and vendors without data — [socialk.it](https://socialk.it/en/blog/bluesky-custom-feeds-explained); [socialboostdigital](https://socialboostdigital.com/blog/bluesky-custom-feeds-algorithm-2026)

### Inferences
- **Followers remain the main audience.** Following (plus Bluesky's own Discover and Popular With Friends) very likely accounts for most viewing. Custom feeds, For You included, are a meaningful but secondary channel.

### Gaps
- No Bluesky company statement with usage-share numbers was found, and no third-party measurement either.
