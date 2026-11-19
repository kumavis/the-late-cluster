# Bluesky serial-content posting patterns: running self-thread, quote-post chain, standalone posts, and thread plus self-repost (state as of Nov 2026)

Note on method: the most reliable evidence here comes from Bluesky's own open-source code: the official app (github.com/bluesky-social/social-app, `main` branch, read 19 Nov 2026) and the AppView, lexicons and notification indexer (github.com/bluesky-social/atproto, `main`). Code shows what happens today, but it can change without notice. Practitioner evidence on reach is thin and mostly anecdotal (see Q5). docs.bsky.app now 308-redirects to bsky.network, and I could not retrieve the docs page there (it came back empty), so documentation claims below are cited from the blog, the lexicons or the code.

## Q1. Mechanics of appending a reply to your own old thread

### Takeaway
A new reply at the end of your own thread notifies nobody through the reply mechanism, because reply notifications only go to authors of the five nearest ancestor posts and all of those are you. The only people notified are those who switched on activity notifications for your account and included replies, plus anyone @mentioned. In the official app's Following feed, self-thread replies are always shown to followers. They appear as a slice: the root, a "view full thread" gap marker, the parent (your previous instalment), then the new reply. Bluesky's 2024 blog said replying to an old thread "bumps" it to the top of followers' feeds. Threads have no hard length limit, and since August 2026 the app numbers posts in an author's contiguous thread ("n/N").

### Cited Findings
- **Reply notifications (AppView indexer).** `REPLY_NOTIF_DEPTH = 5`. For each ancestor of a new post with height < 5, the indexer creates a `reply` notification to that ancestor's author. The post's own creator is pre-seeded into the `notified` set and is never notified. The loop stops at a hidden reply, and no reply notifications are created at all if the post violates the threadgate. When you append to your own thread, the 5 nearest ancestors are your own posts, so earlier repliers and people who liked or reposted the root get no notification. Mentions in the text still notify the mentioned accounts. — [atproto post indexing plugin](https://github.com/bluesky-social/atproto/blob/main/packages/bsky/src/data-plane/server/indexing/plugins/post.ts)
- **Notification types.** The notification reasons are: like, repost, follow, mention, reply, quote, starterpack-joined, verified, unverified, like-via-repost, repost-via-repost, subscribed-post, contact-match. None of them is "new reply in a thread you're in", so Bluesky has no thread-follow or thread-subscription feature. — [listNotifications lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/notification/listNotifications.json)
- **Following feed (official app).** `shouldDisplayReplyInFollowing` first requires the reply's author to be you or someone you follow. It then contains the comment "Always show self-threads": when the parent, grandparent and root all have the same author, the reply is shown. Replies to other people need the parent, grandparent or root author to be someone you follow. — [social-app feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts)
- **Slice context.** A non-repost reply in a feed is built as a slice of [root, parent, reply]. The grandparent is not included. If the parent is not a direct reply to the root, the slice is marked `isIncompleteThread`, which shows a "view full thread" style gap. In a long self-thread, a follower therefore sees the series' opening post, then a gap, then the previous instalment, then the new one. — [feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts)
- **Thread de-duplication.** The Following feed dedupes by thread root (`dedupThreads`): "you only see the most recent reply". Later non-repost slices with an already-seen root are dropped, and posts already seen in context are trimmed. — [feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts)
- **Bumping (Aug 2024).** The blog announced that Bluesky was "reducing the frequency of showing replies in the Following feed" to conversations where at least two people you follow reply to each other. It also said replying to an older thread of yours bumps it to the top of followers' feeds, so you no longer need to repost your reply. TechCrunch quoted it as "without having to repost your own reply to surface it", and noted user complaints that Following feeds had "significantly less content". The feed shows the root above the new reply, but the root's own timestamp and position are not changed. — [Bluesky blog, 28 Aug 2024](https://bsky.social/about/blog/08-28-2024-anti-toxicity-features); [TechCrunch, 28 Aug 2024](https://techcrunch.com/?p=2844489)
- **Thread numbering (new in 2026).** The feed view and thread lexicons now carry `opThreadPostIndex` ("The 1-indexed position of this post within the contiguous OP thread") and `opThreadPostCount`. The app renders these as a badge (`ThreadItemPostNumber.tsx`), added in social-app commit "Add canonical OP thread numbering (#11184)" on 5 Aug 2026. A running self-thread therefore shows each instalment's position, e.g. "37/37". — [feed defs lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/feed/defs.json); [ThreadItemPostNumber.tsx](https://github.com/bluesky-social/social-app/blob/main/src/screens/PostThread/components/ThreadItemPostNumber.tsx); [commit history](https://github.com/bluesky-social/social-app/commits/main/src/screens/PostThread/components/ThreadItemPostNumber.tsx)
- **Thread loading.** `getPostThreadV2` returns, from any anchor post, all parents above it ("recursively resolving the parent") and, by default, 6 levels of replies below it (maximum 20), with a branching factor of 10 by default and 100 at most. The default sort is "oldest". If a reader opens instalment N, the whole chain above loads. If they open the root of a long thread, only about 6 levels load, and the app shows "read more" components (`ThreadItemReadMore`, `ThreadItemReadMoreUp`) to continue. The endpoint is marked unspecced and "WILL change". — [getPostThreadV2 lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/unspecced/getPostThreadV2.json); file list in [social-app PostThread components](https://github.com/bluesky-social/social-app/tree/main/src/screens/PostThread/components)
- **No thread length limit.** There is no limit on the number of posts in a thread (secondary guide). Because each post is just a reply, you can add to a thread days later. — [bskyinfo guide](https://bskyinfo.com/guides/getting-started/understanding-and-using-threads-on-bluesky/)
- **A reply is a normal post.** A reply is an `app.bsky.feed.post` with a `reply {root, parent}` reference and the same embed union as any other post (images, video, gallery, external link card, record, recordWithMedia). It has its own `at://` URI and bsky.app/profile/.../post/<rkey> URL, and it can be liked, reposted (a repost's `subject` is any post strongRef) and quoted. — [post lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/feed/post.json); [repost lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/feed/repost.json)
- **Reply gating.** A threadgate on the root controls who may reply (up to 5 allow rules, e.g. followers or mentioned users). It also lists hidden replies, and only the thread creator can hide replies. The author's own replies are not blocked by their own gate. — [Bluesky blog, Aug 2024](https://bsky.social/about/blog/08-28-2024-anti-toxicity-features); [adaptlypost threadgate guide](https://adaptlypost.com/blog/bluesky-reply-controls-threadgate)

### Inferences
- A running self-thread reaches followers through the Following feed, where self-threads always pass the reply filter. It does not reach people through notifications, apart from activity subscribers who opted into replies.
- Because the feed slice shows root, gap, parent and the new reply, each new instalment carries its series context. A follower who has already seen that root in the same session may have later slices from the same thread de-duplicated.
- Whether custom feeds and Discover include replies depends on each feed generator, and other researchers cover that. Many topic feeds exclude replies, which would disadvantage a reply-based instalment. This is unverified here.

### Gaps
- Whether the AppView's own Following timeline (server side) ranks a fresh self-reply in exactly the position the 2024 blog post described: the 2024 behaviour matches current client code, but I did not confirm server-side ordering.
- I found no official statement on a maximum thread depth for storage or rendering beyond the API's `below` maximum of 20 per fetch.

## Q2. Mechanics of a quote-post chain

### Takeaway
A quote embeds one post. In a feed you see the quoting post plus one level of quote, and a quote inside a quote is not rendered there. Quoting another person notifies them. Quoting yourself notifies nobody. The quoting slot can be combined with images, video, a gallery or a link card through `recordWithMedia`, so a quote does not cost you media. Authors can detach their post from quotes, and can disable quoting with a postgate.

### Cited Findings
- **Nesting depth.** In `Embed/index.tsx`, a `post` embed returns `null` when `isWithinQuote && !allowNestedQuotes`. Inside `QuoteEmbed`, the quoted post's own embed is rendered with `isWithinQuote = true`, and with the comment "already within quote? override nested", `allowNestedQuotes` is forced to false. So at most the quoting post plus one quoted post is shown, and the second-level quote is hidden (media in the quoted post still shows). `allowNestedQuotes` is referenced only in the embed components and DM message embeds. — [social-app Embed/index.tsx](https://github.com/bluesky-social/social-app/blob/main/src/components/Post/Embed/index.tsx)
- **Walking back through the chain.** A reader taps the quoted post, which opens that post with its own quote, and so on one hop at a time. The record view includes `quoteCount`, and there is a quotes list view (authors "see all quote posts" on their post, v1.90). — [embed.record lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/embed/record.json); [Bluesky blog, Aug 2024](https://bsky.social/about/blog/08-28-2024-anti-toxicity-features)
- **Quote notifications.** The indexer notifies the quoted post's author with reason `quote`, except when that author is the creator (the creator is pre-seeded in `notified`). A self-quote chain therefore generates no notifications. — [atproto post.ts](https://github.com/bluesky-social/atproto/blob/main/packages/bsky/src/data-plane/server/indexing/plugins/post.ts)
- **Embed combinations.** A post has one `embed`, which is one of: images, video, gallery, external, record, or recordWithMedia. `recordWithMedia` = record plus media, where media is one of images, video, gallery, or external ("a quote post and image, or a quote post and external URL card"). A quote can carry a video or a link card, but not both, and not two quotes. — [recordWithMedia lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/embed/recordWithMedia.json); [post lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/feed/post.json)
- **Gallery embed (new).** `app.bsky.embed.gallery` holds up to 20 items in the schema, with a "soft limit of 10 items in authoring UIs", images up to 2 MB, and alt text required. I could not date when it shipped. — [gallery lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/embed/gallery.json)
- **Detach and quote controls.** Since v1.90 (Aug 2024), authors can detach their original post from a quote post. When that happens the quote renders as `viewDetached`. A postgate record (`app.bsky.feed.postgate`) can disable quoting and stores the detached URIs (a secondary source says the list holds up to 50). — [Bluesky blog](https://bsky.social/about/blog/08-28-2024-anti-toxicity-features); [embed.record lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/embed/record.json); [adaptlypost](https://adaptlypost.com/blog/bluesky-reply-controls-threadgate)

### Inferences
- A self-quote chain gives each instalment a top-level post (good for custom feeds and Discover, which favour top-level posts), with one hop of context visible. Readers have to tap back one instalment at a time, so the chain is a poor archive compared with a thread, which loads every parent in one view.
- Since recordWithMedia allows a link card or video alongside the quote, the real cost is minor: you cannot put both a link card and a video on the same post, and the quoted post's own quote is hidden.

### Gaps
- I did not verify whether the thread (post detail) view sets `allowNestedQuotes` to true anywhere. The code search found no such caller outside the embed files and DMs.

## Q3. Standalone posts and the tools that tie a series together

### Takeaway
The main tools are a pinned post (Oct 2024), hashtags (with up to 8 extra hidden tags per post in the record), lists and starter packs (June 2024), and custom feeds. Bluesky's 2024 review lists hashtags as a 2024 addition, but I did not find their launch date.

### Cited Findings
- **Pinned posts** arrived in v1.92 in October 2024 via "Pin to profile". — [Gigazine, 11 Oct 2024](https://www.gigazine.net/gsc_news/en/20241011-bluesky-1-92-pinned-post)
- **Pinned posts in feeds.** The feed lexicon has `reasonPin` (and `skeletonReasonPin`) alongside `reasonRepost`, so the pinned post shows at the top of the author feed. — [feed defs](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/feed/defs.json)
- **Tags.** A post record's `tags` field holds "Additional hashtags, in addition to any included in post text and facets", up to 8 tags of 64 graphemes each. Inline hashtags are facets. — [post lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/feed/post.json)
- **Starter packs** launched 27 June 2024 with up to 50 people and 3 custom feeds. Hashtags, video (Sept 2024) and trending topics (Dec 2024) are all listed in Bluesky's 2024 review. — [Bluesky 2024 in review](https://www.bsky.social/about/blog/12-30-2024-year-in-review); [TechCrunch](https://techcrunch.com/2024/06/27/bluesky-lets-you-curate-accounts-and-feeds-to-follow-with-its-starter-pack-feature)
- **Embeddable records.** Feeds, lists, labelers and starter packs can all be embedded as records (`generatorView`, `listView`, `starterPackViewBasic`). A series post can therefore quote-embed the series' custom feed instead of a previous instalment. — [embed.record lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/embed/record.json)

### Inferences
- A pinned "series index" post, either the thread root itself or a post linking to a custom feed or tag, is the low-cost way to make standalone instalments discoverable from the profile.

### Gaps
- I found no official documentation of how tag search ranks results, and no evidence on whether hidden `tags` are surfaced in the app UI.

## Q4. Account-level "activity notifications"

### Takeaway
Activity notifications shipped in July 2025. A user taps a bell on a profile and chooses posts, or posts and replies. The account owner can restrict or disable who may subscribe.

### Cited Findings
- **Launch (July 2025).** The bell next to Follow notifies you of new posts, with a separate option for replies. The list is managed under Settings > Notifications > Activity notifications. Accounts can disable the feature or limit it to people they follow. The same update added granular notification settings and replaced "priority notifications". — [9to5Mac, 9 Jul 2025](https://9to5mac.com/2025/07/09/bluesky-gets-activity-notifications-as-it-tries-to-lure-news-and-sports-users/); [MacRumors, 8 Jul 2025](https://www.macrumors.com/2025/07/08/bluesky-new-customized-alerts-options/)
- **API.** `activitySubscription` has required booleans `post` and `reply`, set via `app.bsky.notification.putActivitySubscription` for a subject DID. Notifications arrive with reason `subscribed-post`. — [notification defs](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/notification/defs.json); [putActivitySubscription](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/notification/putActivitySubscription.json); [listNotifications](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/notification/listNotifications.json)

### Inferences
- Subscribers who chose "posts" only will not be notified of a thread-reply instalment. Top-level instalments, including self-quotes, reach all bell subscribers. This is a concrete mechanical advantage of top-level posting.

### Gaps
- I did not find out from code whether a repost triggers `subscribed-post`. The reason name and the lexicon (post/reply only) suggest it does not.

## Q5. Evidence on reach and engagement

### Takeaway
No public dataset compares replies, quotes and top-level posts on Bluesky. Publisher evidence covers referral traffic in aggregate: Bluesky beats Threads, X is far larger in volume, and link clicks are high quality. Bluesky says it does not demote links. All of this evidence is weak to moderate: self-reported, aggregate, and often from vendors.

### Cited Findings
- **Links.** Bluesky COO Rose Wang: "unlike other platforms, we don't de-promote your links". One eMarketer piece reportedly says link posts are demoted, but on inspection that statement refers to X. Treat "no demotion" as stated policy, not a measured result. — [Social Media Today](https://www.socialmediatoday.com/news/heres-where-each-of-the-big-social-platform-stands-on-external-links/733946/); [eMarketer](https://www.emarketer.com/content/bluesky-surpasses-threads-x-referral-traffic-source)
- **Publisher traffic.** Chartbeat found Bluesky referrals were about 0.8% of X's. The Boston Globe reported about 3x the traffic and 4.5x the subscriber conversions from Bluesky compared with Threads, and the Guardian saw about 2x Threads (late 2024 to early 2025). Strength: moderate, self-reported. — [Search Engine Journal](https://www.searchenginejournal.com/bluesky-emerges-as-traffic-source-publishers-report-3x-engagement/534095/); [Digiday](https://digiday.com/media/media-briefing-publishers-strategy-on-bluesky-is-tbd); [Sherwood](https://sherwood.news/tech/bluesky-engagement-news-publishers-nyt-cnn-benefit/)
- **Attribution.** Since March 2025, outbound links carry a go.bsky.app referrer, but Press Gazette notes heavy under-attribution of Bluesky traffic. — [TechCrunch, 20 Mar 2025](https://techcrunch.com/2025/03/20/bluesky-makes-it-easier-for-publishers-to-track-referrals/); [Press Gazette](https://pressgazette.co.uk/?p=234447)
- **Publisher sentiment for 2026.** A survey of 280 news executives (likely the Reuters Institute trends report) found a net -11 in planned effort on Bluesky for 2026. I only saw this in a search snippet and could not confirm it. — [snippet via socialpilot/aggregators; unverified]
- **Cross-platform study.** Buffer's 2026 study of 52M+ posts has little Bluesky format detail. A secondary write-up cites a +5% engagement lift from replying to comments on Bluesky. — [Buffer](https://buffer.com/resources/state-of-social-media-engagement-2026/); [SocialEcho summary](https://www.socialecho.net/en/blog/docs/2026-social-media-engagement-report-52m-posts-insight)
- **Bluesky shows no impressions.** The app exposes no impressions or reach data, only interactions, so creators cannot easily measure reply-vs-top-level reach. — [Buffer search summary / Buffer help](https://buffer.helpscoutdocs.com/article/855-using-bluesky-with-buffer)
- **Webcomics.** Coverage is anecdotal: creators report genuine engagement, and one cartoonist (Beetle Moses) posts very frequently and does not chase per-post metrics. — [SKTCHD interview](https://sktchd.com/interview/beetle-moses-interview/); [Leetoo](https://leetoo.net/?p=2749)

### Inferences
- Given the lack of impressions data, any reach claim about replies versus top-level posts on Bluesky is anecdotal. Mechanically, top-level posts are eligible for more surfaces: bell subscribers on "posts", most topic feeds, and the author's Posts tab.

### Gaps
- I found no study or dataset comparing engagement for replies, quote posts or threads on Bluesky, and no Bluesky-specific study of native media versus link cards.

## Q6. Community norms and rules for automation

### Takeaway
The Community Guidelines (updated 19 Sept 2025) prohibit spam and "artificially manipulat[ing] features or social signals to gain unearned reach". They have no bot-specific section. The developer side recommends a "bot" self-label on bot accounts and enforces points-based rate limits. I found no strong documented norm against self-threads or self-quotes. Automated self-reposting is offered by scheduling tools, and no source describes how that is perceived.

### Cited Findings
- **Guidelines.** "Do not send spam or repeatedly post content in ways that disrupt normal conversations"; "Do not artificially manipulate features or social signals to gain unearned reach". Automated harassment and abuse of APIs or rate limits are prohibited. The guidelines do not specifically address bots or unsolicited replies and mentions. — [Bluesky Community Guidelines](https://bsky.social/about/support/community-guidelines)
- **Developer practice.** Bots are recommended to add a profile self-label "bot". Rate limits are 5,000 points per hour and 35,000 per day per account (secondary source citing Bluesky docs, Sept 2026). — [OpenTweet](https://opentweet.io/answers/bluesky-api-rate-limit-posts-per-day); [Bluesky rate-limit blog (mirror)](https://bsky-docs-246.onrender.com/blog/rate-limits-pds-v3)
- **Self-reposting.** Self-reposting is commonly supported by tools (Publer AutoShare, Circleboom auto-reposter at chosen intervals). — [Publer](https://publer.com/help/en/article/how-to-repostretweet-posts-for-bluesky-mu03ml); [Circleboom](https://circleboom.com/social-media-scheduler/bluesky-scheduler/bluesky-auto-poster/auto-reposter)
- **Hiding reposts.** Users can hide reposts from specific accounts. — [WERSM](https://wersm.com/bluesky-hide-reposts-specific-users/)

### Gaps
- I found no authoritative or survey evidence on how Bluesky users perceive long self-threads, self-quotes or self-reposts. Treat anything on norms as a gap.

## Q7. Examples of serial content

### Takeaway
The clearest documented example is Transistor's podcast-host integration, which uses pattern (c): one top-level post per episode, with replies synced back as website comments. I did not find documented cases of publishers running a growing thread plus reposts.

### Cited Findings
- **Transistor.fm (Feb 2025).** "Every new episode is automatically posted to Bluesky", using a template. "Any replies to your Bluesky post appear on your podcast website automatically". The page says nothing about threads or quotes. — [Transistor changelog, 13 Feb 2025](https://transistor.fm/changelog/bluesky-comments/)

### Gaps
- I did not directly observe public serial accounts (daily bots, webcomics, weekly shows) within the budget for this task, so no account-level pattern inventory is included. This needs direct observation of profiles.

## Q8 (added brief). "Thread plus self-repost": append the instalment as a reply, then repost it from the same account

### Takeaway
It works mechanically: any account can repost its own reply. In the official app, however, a reposted reply is shown alone, with "Reposted by" and no parent or root context. A code comment says "Reposting a reply elevates it to top-level, so its parent/root won't be displayed." Reposts bypass the reply filter and the thread de-dupe, so a follower may see the instalment twice (once in thread context, once as a bare repost). Bluesky said in 2024 that self-reposting is unnecessary for bumping a self-thread reply. Feed generators index posts, so the repost does not make the reply eligible for any feed it was not already in.

### Cited Findings
- **Self-reposting is allowed.** The repost record is `{subject: strongRef, createdAt, via?}`, with no restriction on the subject's author or on whether it is a reply. — [repost lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/feed/repost.json)
- **Reposted replies are rendered without context.** In `FeedViewPostsSlice`, after adding the post itself, `if (reason) { return }` skips adding parent and root when the feed item has a reason (repost). `parentAuthor` is still recorded, so the app can show a "reply to …" label. The code comment: "Reposting a reply elevates it to top-level, so its parent/root won't be displayed." — [feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts)
- **Reposts bypass the reply filters.** `followedRepliesOnly` and `removeReplies` skip slices where `slice.isRepost`, and `dedupThreads` only drops `!isRepost` slices with an already-seen root. A reposted reply therefore always shows to followers, even if they would not otherwise see the reply and even if the thread was already shown. For reposted replies, per-post "seen" de-dupe is disabled ("we don't want to miss them later"). — [feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts)
- **The 2024 change made self-reposting unnecessary.** Bluesky said in Aug 2024 that replying to an older thread of yours bumps it, so you no longer need to repost your reply. TechCrunch: "without having to repost your own reply to surface it". — [Bluesky blog](https://bsky.social/about/blog/08-28-2024-anti-toxicity-features); [TechCrunch](https://techcrunch.com/?p=2844489)
- **Notifications.** Repost notifications go to the subject's author. Since the author is also the reposter, presumably nothing is sent. `like-via-repost` and `repost-via-repost` notify a reposter when others engage through their repost. Neither notifies followers. Activity subscriptions are defined only for `post` and `reply`. — [listNotifications](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/notification/listNotifications.json); [notification defs](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/notification/defs.json)
- **Feeds.** Feed skeletons can include `skeletonReasonRepost`, so a feed generator may choose to surface reposts. Whether any given feed does is up to that generator. — [feed defs](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/feed/defs.json)
- **Embeds on replies.** A reply can carry a link card or video (same embed union as any post). — [post lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/feed/post.json)

### Inferences
- Followers likely see the instalment twice: as a bare repost at repost time and as a self-thread slice with context. The client does not de-dupe the repost against the slice, though the server timeline might. I did not verify this in a live client.
- Since August 2026, the thread-number badge ("n/N") may also appear on the bare repost (its numbering comes from the post view), giving some context. I did not verify this.
- A newcomer who lands on the bare repost sees a "reply to [same account]" post with no context, and must tap through to load the parents.
- Undoing and redoing a repost to resurface the post again is mechanically possible: delete the repost record and create a new one with a new `createdAt` and `indexedAt`. Doing it repeatedly risks the guidelines' "artificially manipulate ... to gain unearned reach" clause. I found no explicit ruling on this.

### Gaps
- I found no real examples of serial publishers using growing thread plus reposts, and no practitioner statements comparing it with fresh top-level posts.
- I found no documented community norm or complaint about self-reposting specifically.
- I did not verify how bell subscribers or the Following feed ranking treat a self-repost server side.
