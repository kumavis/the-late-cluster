# Bluesky Discover and first-party feeds: selection, ranking and treatment of post types (as of Nov 2026)

Research date: 2026-11-19. Source labels used below: **[OFFICIAL]** means Bluesky's blog, developer docs or staff statements. **[CODE]** means open-source code in github.com/bluesky-social/social-app, read on its `main` branch on 2026-11-19. **[PRESS]** means news reporting. **[3P]** means third-party marketing or growth blogs, which are low reliability and usually unsourced. The Discover ranking service itself is not open source. I found no published ranking code or model description for it.

## 1. How does the Discover feed work today (signals, candidate sourcing, official statements)?

### Takeaway
Discover (internally the `whats-hot` feed generator) is a closed-source custom feed run by Bluesky. Bluesky has never published its ranking signals or how it sources candidates. Bluesky has confirmed these inputs and controls:
- personalisation plus trending content (2023);
- "Show more / Show less like this" feedback (May 2024);
- private dislikes as a beta signal (Oct 2025);
- interaction with Trending topics feeding into Discover (2024–25);
- a poster-side opt-out that keeps posts away from non-followers (Aug/Sep 2026).

Specific claims about weights (likes vs reposts vs replies, "first hour velocity") come from third parties and are unverified.

### Cited Findings
- **[OFFICIAL/PRESS, Jul 2023]** Discover replaced "What's Hot" as the default algorithmic feed, announced in a Bluesky blog post dated about 27 Jul 2023. It blends "personalized recommendations and trending content". Planned additions at the time were network-wide trending topics, posts from followed accounts and posts from accounts in the user's social graph. — [AlternativeTo, 29 Jul 2023](https://alternativeto.net/news/2023/7/bluesky-revamps-feed-structure-and-replaces-what-s-hot-with-new-personalized-discover-feed)
- **[3P/explainer, Feb 2024]** Discover "mixes some posts from the people you follow with some other posts that you might like". — [mackuba.eu guide, 21 Feb 2024](https://mackuba.eu/2024/02/21/bluesky-guide/)
- **[OFFICIAL via PRESS, 10 May 2024]** A post's menu gained "Show more like this" / "Show less like this", which let users steer Discover. TechCrunch did not describe the ranking method. — [TechCrunch, 10 May 2024](https://techcrunch.com/2024/05/10/bluesky-now-lets-you-personalize-its-main-discover-feed-using-new-controls)
- **[OFFICIAL, likely 2024]** The @bsky.app account posted "We just launched some improvements to the Discover feed…", aimed especially at people who joined in the last month. I could not load the post text or exact date; a search snippet put it at about 771 days old, which suggests autumn 2024. — [bsky.app post](https://web-cdn.bsky.app/profile/bsky.app/post/3l5z5655pri2n)
- **[PRESS, Dec 2024 / Apr 2025]** Trending topics launched in late Dec 2024, first in English only. The Explore page (the revamped search tab, with trends, suggested accounts, starter packs and user-entered interests) launched in Apr 2025. Press reported that interacting with a topic means more posts on that topic in Discover. — [9to5Mac, 26 Dec 2024](https://9to5mac.com/2024/12/26/bluesky-trending-topics/); [TechCrunch, 10 Apr 2025](https://techcrunch.com/2025/04/10/blueskys-latest-update-adds-chat-reactions-and-an-explore-page-similar-to-x); [Engadget](https://www.engadget.com/social-media/bluesky-launches-a-trending-topics-feature-in-search-140049208.html)
- **[OFFICIAL, 31 Oct 2025]** Bluesky said it is "testing new ranking models" and a "mix of ranking updates". It began beta-testing a private "dislike" meant to "improve personalization in Discover and other feeds". The dislike signal "isn't global": it mainly affects the user's own experience and, to an extent, others in their "social neighborhood". — [Bluesky blog, 31 Oct 2025](https://bsky.social/about/blog/10-31-2025-building-healthier-social-media-update); [TechCrunch, 31 Oct 2025](https://techcrunch.com/2025/10/31/bluesky-hits-40-million-users-introduces-dislikes-beta)
- **[OFFICIAL, 26 Jan 2026]** Head of Product Alex Benzer wrote that Discover "has come a long way, but there's more to do". He said a dedicated team is being formed and that Bluesky is exploring topic tags so posters can reach the right audience. No dates were given. — [Bluesky blog, 26 Jan 2026](https://bsky.social/about/blog/01-26-2026-whats-next-at-bluesky); [TechCrunch, 27 Jan 2026](https://techcrunch.com/2026/01/27/bluesky-teases-2026-roadmap-a-better-discover-feed-real-time-features-and-more/)
- **[PRESS paraphrase, Jan 2026]** Coverage paraphrased Bluesky as saying Discover is still "too random to drive meaningful content loops". I did not see this wording in the blog excerpt I fetched, so treat it as paraphrase. — [TechCrunch search summary](https://techcrunch.com/2026/01/27/bluesky-teases-2026-roadmap-a-better-discover-feed-real-time-features-and-more/)
- **[OFFICIAL, 27 Aug 2026 setting / 1 Sep 2026 developer post]** A new setting, "Ask apps to hide my posts from algorithmic recommendations", is stored as the record `app.bsky.actor.contentVisibilityDeclaration` with `hideFromAlgorithmicRecommendations: true`. Bluesky's Discover respects it:
  - the poster's posts will not appear in a stranger's Discover feed;
  - they "might still show up in the Discover feed of a follower".

  This implies that Discover's default candidate pool includes posts from both followed and non-followed accounts. Topic and list feeds such as Science and BookSky need not honour the setting. — [Bluesky developer blog (Jim Ray), 1 Sep 2026](https://bsky.network/blog/content-visibility-declaration); [AlternativeTo, 28 Aug 2026](https://alternativeto.net/news/2026/8/bluesky-adds-discover-feed-controls-for-follower-only-posts/); [iPhone in Canada, 28 Aug 2026](https://www.iphoneincanada.ca/2026/08/28/bluesky-discover-opt-out/)
- **[CODE]** The app runs very little client-side filtering on any custom feed, Discover included: only `preferredLangOnly(contentLanguages)` and `removeMutedThreads`. It applies no reply, repost or quote filters. Everything else in Discover's selection is decided server-side by Bluesky's feed generator. — [social-app feed-tuners.tsx](https://github.com/bluesky-social/social-app/blob/main/src/state/preferences/feed-tuners.tsx)
- **[3P, undated 2025–26]** Growth blogs claim that early engagement velocity, network proximity (posts your follows or their follows interact with) and engagement history drive Discover. One claims an Oct 2025 "social neighborhoods" ranking layer for Discover. Bluesky's post actually applies social neighborhoods to *reply* ranking. None of these blogs cite Bluesky. — [SocialBee](https://socialbee.com/blog/how-does-bluesky-algorithm-work/); [Schedulala](https://schedulala.com/blog/bluesky-algorithm); [PostEverywhere](https://posteverywhere.ai/blog/how-the-bluesky-algorithm-works)

### Inferences
- Language tagging matters for Discover. The client drops custom-feed posts that are not in the viewer's content languages, so a post with the wrong or missing `langs` tag may be filtered out for some viewers. This comes from the code; I measured no effect.
- The opt-out wording implies Discover deliberately mixes followed-account content with stranger content. Followers' Discover is therefore a second surface beyond Following.

### Gaps
- I found no official, current list of Discover ranking signals or their weights. I also found nothing on how candidates are generated (for example co-engagement or embeddings) and no engineer talk describing the model. Earlier Bluesky engineers have described Discover in posts, but I could not retrieve those posts.
- I could not confirm whether the Oct 2025 dislike beta has rolled out fully, or whether topic tags shipped by Nov 2026.

## 2. Does Discover surface replies? What about a new reply appended to an old self-thread?

### Takeaway
Bluesky has published no rule saying whether Discover includes or excludes replies, and I found no measurement of it. If Discover's server does return a reply, the official app renders it with its parent and root above it, plus an "incomplete thread" marker when posts in between are skipped. A late reply in a long self-thread would therefore appear as root plus immediate parent plus the new reply, not alone.

### Cited Findings
- **[CODE]** In the app, a feed item that is a reply and has no `reason` (not a repost) is built as a slice: root first, then the parent (unless parent equals root), then the reply. `isIncompleteThread` is set when the parent does not reply directly to the root. That is the case for a reply added deep in a long self-thread, and the app then draws a gap marker between root and parent. The same slice-building applies to every feed, Discover included. — [social-app feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts)
- **[CODE]** For custom feeds such as Discover, the client applies no `removeReplies` tuner. Reply inclusion is entirely the feed generator's choice. — [feed-tuners.tsx](https://github.com/bluesky-social/social-app/blob/main/src/state/preferences/feed-tuners.tsx)
- **[OFFICIAL, Oct 2025]** Bluesky's stated "social neighborhood" prioritisation and toxicity down-ranking apply to replies *within threads*, search and notifications. This is reply ranking under a post, not Discover inclusion. — [Bluesky blog, 31 Oct 2025](https://bsky.social/about/blog/10-31-2025-building-healthier-social-media-update)
- No source I found says whether Discover includes replies (searches for "excludes replies", "includes replies" and similar wording returned nothing relevant). — [search results summary; e.g. EFF feed guide, Jun 2024](https://www.eff.org/deeplinks/2024/06/how-clean-your-bluesky-feed)

### Inferences
- Anecdotally, Discover is mostly top-level posts. I could not verify this. Planning should assume a deep self-reply has a lower and less predictable chance of Discover placement than a fresh top-level post.
- If a deep reply is shown, the old root post will sit on top of it. Viewers see the series' first post, a gap marker, the previous instalment and then the new one. That uses vertical space and may read as old content.

### Gaps
- I have no empirical test of whether Bluesky's `whats-hot` generator returns replies, or whether it returns them only when they are self-replies.

## 3. Quote posts vs plain posts in Discover

### Takeaway
A quote post is a top-level post in the data model: it is a record with an embed of the quoted post, not a reply. Nothing official says Discover treats quote posts differently from other posts. The client does not filter quote posts in Discover; only the Following/list "hide quote posts" preference removes them.

### Cited Findings
- **[CODE]** `removeQuotePosts` runs only when the Following/list-feed preference `hideQuotePosts` is on. It is not applied to custom feeds. — [feed-tuners.tsx](https://github.com/bluesky-social/social-app/blob/main/src/state/preferences/feed-tuners.tsx)
- **[OFFICIAL, Oct 2025]** Quote posts can be detached by the quoted author to limit "unwanted attention or dogpiling". This affects the embed's visibility, not ranking. — [Bluesky blog, 31 Oct 2025](https://bsky.social/about/blog/10-31-2025-building-healthier-social-media-update)
- **[3P]** Growth blogs claim quote posts are a "stronger relevance signal" than reposts. These claims are unsourced, and other blogs contradict them. — [Schedulala](https://schedulala.com/blog/bluesky-algorithm); [bskygrowth](https://blog.bskygrowth.com/how-to-go-viral-on-bluesky-2026/)
- **[CODE/issue]** Users have long asked to hide reposts and quote posts per account. A later comment says the partial fix (#11223) still cannot hide quote posts. — [social-app issue #1116](https://github.com/bluesky-social/social-app/issues/1116)

### Inferences
- A series instalment published as a quote post of the previous instalment (or of the series root) is a top-level post. It would be as eligible for Discover as any standalone post, while still linking visibly to earlier context. Some Following-feed users who turned on "hide quote posts" would miss it.

### Gaps
- I found no official statement or measurement on whether Discover up- or down-weights quote posts.

## 4. Link cards / external links vs native media

### Takeaway
Bluesky's leadership has repeatedly and publicly said it does not demote links. That position was stated in Nov 2024, repeated in Mar 2025 and reiterated in Apr 2026. I found no measured evidence of link down-ranking in Discover, and no evidence for or against a native-media boost.

### Cited Findings
- **[OFFICIAL, 27 Nov 2024]** COO Rose Wang: "Unlike other platforms, we don't de-promote your links. Post all the links you want — Bluesky is a lobby to the open web." — [eMarketer](https://www.emarketer.com/content/bluesky-surpasses-threads-x-referral-traffic-source); [TechCrunch, 20 Mar 2025](https://techcrunch.com/2025/03/20/bluesky-makes-it-easier-for-publishers-to-track-referrals/)
- **[OFFICIAL via PRESS, Mar 2025]** Bluesky made referral tracking easier for publishers, with outbound clicks attributed via `go.bsky.app`. — [TechCrunch, 20 Mar 2025](https://techcrunch.com/2025/03/20/bluesky-makes-it-easier-for-publishers-to-track-referrals/)
- **[OFFICIAL via PRESS, Apr 2026]** Wang on Semafor's Mixed Signals: journalists came because "their reach and distribution were being throttled" elsewhere, and "links are downranked on a lot of platforms." — [Semafor, 10 Apr 2026](https://www.semafor.com/article/04/10/2026/how-bluesky-earned-its-reputation-and-why-it-could-be-the-way-of-the-future)
- **[3P, Jul 2026]** Buttondown shipped "enhanced link cards" for Bluesky. That suggests link cards are still a supported format. — [Buttondown changelog](https://buttondown.com/changelog/bluesky-enhanced-cards)
- **[3P]** Link-card failures reported by tools (cards not rendering, "429 Too Many Requests" previews) are rendering bugs, not ranking penalties. — [Blog2Social forum](https://community.blog2social.com/forum/wordpress/social-networks/11497-bluesky-link-template-not-using-link-cards)

### Inferences
- "No demotion" is a policy statement, not a guarantee. Discover's learned ranking could still under-serve link posts indirectly, for example if link posts get fewer in-app likes. I found no data either way.

### Gaps
- I found no independent A/B measurement of link-card vs native-media reach on Discover.

## 5. Following feed and thread view: self-threads that grow over weeks; reply-visibility rules

### Takeaway
In Following, the official app always passes a followed author's self-replies, because both the reply author and the parent/root author are followed. Each self-reply is shown as a slice of root, then parent, then the new reply. An "incomplete thread" gap appears when posts in between are skipped. Replies to other people are shown only if the viewer follows the reply author *and* someone in the chain (parent, grandparent or root). Users can hide all replies, reposts or quote posts. Only one slice per thread root is kept per feed load.

### Cited Findings
- **[CODE]** These tuners apply to the Following feed and to list feeds:
  - always: `removeOrphans` first, then `dedupThreads` and `removeMutedThreads`;
  - `removeReposts` if "hide reposts" is on;
  - `removeQuotePosts` if "hide quote posts" is on;
  - if "hide replies" is on, `removeReplies`; otherwise `followedRepliesOnly(userDid)`.

  — [feed-tuners.tsx](https://github.com/bluesky-social/social-app/blob/main/src/state/preferences/feed-tuners.tsx)
- **[CODE]** `removeReplies` removes a non-repost reply only if its authors are *not* all the same person (`!areSameAuthor(slice.getAuthors())`). Self-threads therefore survive even when the viewer hides replies. — [feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts)
- **[CODE]** `followedRepliesOnly` / `shouldDisplayReplyInFollowing` require the reply author to be the viewer or someone the viewer follows. Self-threads always pass. For other replies, the parent, grandparent or root author must also be the viewer or followed. — [feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts)
- **[CODE]** `dedupThreads` keeps one slice per root URI (reposts excepted). If several replies to the same root land in one timeline load, only the first, newest-ranked slice is shown. — [feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts)
- **[CODE]** Slice construction: root, then parent (if different from root), then reply. When the parent is not a direct reply to the root, the slice is marked `isIncompleteThread` and a gap is drawn. For a weekly self-thread at instalment N, followers see instalment 1 (root), a gap, instalment N-1 and instalment N. — [feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts)
- **[OFFICIAL/PRESS, app v1.90, date not confirmed]** Following previously showed every reply with the same visibility as a top-level post. Version 1.90 restricted it to conversations between at least two people the user follows. — [pipedot / feddit summaries](https://pipedot.org/6VC6B); this is consistent with the code above.
- **[3P, Caribou client issue]** An independent description of bsky.app behaviour: by default a reply appears only when the reader follows the author being replied to, and it is drawn with its parent (and root) above it as one slice. — [beatzball/caribou #275](https://github.com/beatzball/caribou/issues/275)
- **[OFFICIAL, Oct 2025]** Thread view: on top-level posts, the Reply button "takes you to the full thread first". Replies in threads are ranked partly by social neighbourhood and down-ranked by a toxicity model. — [Bluesky blog, 31 Oct 2025](https://bsky.social/about/blog/10-31-2025-building-healthier-social-media-update)

### Inferences
- For followers, a self-reply instalment is reliably delivered in Following, even to people who hide replies. It always carries the root on top, so the first instalment is re-shown each week. The follower can tell it is new only from the bottom post.
- Because the AppView timeline orders items by the reply's `indexedAt`, the new instalment appears at its posting time, not the root's. This is my inference: I did not read the AppView getTimeline code.

### Gaps
- I did not verify the AppView's server-side `getTimeline` reply filtering (the code above is client-side). I could not date v1.90.

## 6. Other first-party / default feeds that matter for reach

### Takeaway
The surfaces that matter are Following (the chronological default), Discover (the algorithmic default), Trending topics and Explore, Bluesky-run topic feeds such as the trending-topic feeds and "Trending Videos", and Bluesky-run starter or interest features. "Popular With Friends" and the video feeds are Bluesky-run custom feeds, but I found no current documentation of their reply or quote rules.

### Cited Findings
- **[PRESS, Dec 2024]** Trending topics went into search and Explore. Tapping a topic shows top and recent posts. Muted words are excluded. — [AlternativeTo, Dec 2024](https://alternativeto.net/news/2024/12/bluesky-introduces-trending-topics-feature-in-its-search); [9to5Mac](https://9to5mac.com/2024/12/26/bluesky-trending-topics/)
- **[PRESS, Apr 2025]** The Explore page launched with trends, suggested accounts, starter packs and an interest picker. "Trending Videos" was added on mobile. — [TechCrunch, 10 Apr 2025](https://techcrunch.com/2025/04/10/blueskys-latest-update-adds-chat-reactions-and-an-explore-page-similar-to-x); [Lindsey Gamble](https://lindseygamble.com/blog/bluesky-custom-video-feeds)
- **[OFFICIAL, Jan 2026]** Custom feeds "power the trending topics system". Bluesky plans to make feeds more central and to add live-event curation tools. — [Bluesky blog, 26 Jan 2026](https://bsky.social/about/blog/01-26-2026-whats-next-at-bluesky)
- **[OFFICIAL, Sep 2026]** Topic and list feeds such as Science and BookSky need not honour the algorithmic opt-out. — [bsky.network developer blog](https://bsky.network/blog/content-visibility-declaration)

### Gaps
- I could not confirm whether "Popular With Friends" still exists in Nov 2026, or what its reply/quote rules are. I also could not find whether trending-topic feeds include replies.

## 7. Notable changes, 2025–2026 (dated)

### Cited Findings
- Dec 2024 to Jan 2025: Trending topics launched. — [9to5Mac](https://9to5mac.com/2024/12/26/bluesky-trending-topics/)
- 20 Mar 2025: publisher referral tracking, with no link demotion reiterated. — [TechCrunch](https://techcrunch.com/2025/03/20/bluesky-makes-it-easier-for-publishers-to-track-referrals/)
- 10 Apr 2025: Explore page and Trending Videos. — [TechCrunch](https://techcrunch.com/2025/04/10/blueskys-latest-update-adds-chat-reactions-and-an-explore-page-similar-to-x)
- 19 Sep 2025: "Building Healthier Social Media" (guidelines and features preview). — [Bluesky blog index](https://bsky.social/about/blog)
- 31 Oct 2025: dislikes beta, new ranking models, social-neighbourhood reply ranking, toxicity down-ranking, Reply button opening the thread first, detachable quotes. — [Bluesky blog](https://bsky.social/about/blog/10-31-2025-building-healthier-social-media-update)
- 26 Jan 2026: roadmap with a dedicated Discover team, topic tags and easier thread creation. — [Bluesky blog](https://bsky.social/about/blog/01-26-2026-whats-next-at-bluesky)
- 27 Aug 2026: Discover opt-out ("hide from algorithmic recommendations"). The developer record was documented on 1 Sep 2026. — [bsky.network](https://bsky.network/blog/content-visibility-declaration)
- Aug 2026: a commercial blog claims a per-account "hide reposts" option shipped. Not verified against release notes. — [social-app issue #1116 context](https://github.com/bluesky-social/social-app/issues/1116)
- Bluesky's blog index for Mar–Nov 2026 shows no post specifically about Discover ranking. Posts in that period cover the CEO change (Jul 2026), profile links (Oct 2026) and the moderation inbox (Oct 2026). — [Bluesky blog index](https://bsky.social/about/blog)

### Gaps
- I could not confirm whether topic tags or a Discover overhaul shipped between Feb and Nov 2026.

## 8. Added at the coordinator's request: the "thread plus self-repost" pattern (reply appended to a long thread, then reposted by the same account)

### Takeaway
In the official app's Following feed, a repost of a reply is shown **alone**: just the reposted reply with a "Reposted by" header, with no parent or root. Reply-visibility rules do not apply to it. The client deliberately "elevates it to top-level". The app de-duplicates by post URI within a feed load, so a follower generally sees the instalment once: as the thread slice (root, gap, parent, reply) or as the repost, whichever ranks first. The rule differs by order, as explained below. No public source says that reposts are a Discover ranking signal, or that a self-repost makes a reply more eligible for Discover.

### Cited Findings
- **[CODE]** For any feed item with a `reason` (a repost), the slice constructor pushes only the reposted post and then returns early (`if (reason) { return }`). No parent or root is added, and no incomplete-thread marker is set. — [feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts)
- **[CODE]** In-code comment: "Reposting a reply elevates it to top-level, so its parent/root won't be displayed. Disable in-thread dedupe for this case since we don't want to miss them later." The code is `const disableDedupe = slice.isReply && slice.isRepost`. — [feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts)
- **[CODE]** Reply-visibility tuners skip reposts:
  - `removeReplies` acts only on replies that are not reposts;
  - `followedRepliesOnly` skips reposts;
  - `dedupThreads` never removes reposts.

  The only tuner that removes a repost is `removeReposts`, used when the viewer has "hide reposts" on. — [feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts); [feed-tuners.tsx](https://github.com/bluesky-social/social-app/blob/main/src/state/preferences/feed-tuners.tsx)
- **[CODE]** Deduplication in `tune()`:
  - Each post URI is tracked in `seenUris`. Already-seen leading items of a slice are trimmed, and a slice is dropped if its last item was already seen.
  - If the thread slice (root, parent, reply) appears first, the reply's URI is recorded, and a later repost slice containing only that reply is dropped.
  - If the repost slice appears first, `disableDedupe` stops the reply URI from being recorded. A later thread slice containing the same reply can therefore still be shown, so the follower could see it twice in that case.
  - Repost slices get a distinct React key built from `reason.indexedAt`, so key-based dedupe does not merge them.

  — [feed-manip.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/api/feed-manip.ts)

### Inferences
- In Following, the repost and the original reply share a timestamp position only if they are posted at about the same moment. The timeline orders reposts by repost time, so if the repost comes right after the reply, the repost slice will usually sort first (newest). The app would then show the repost (reply alone, top-level look), and the thread slice may still show below it, because dedupe is disabled in that order. That is a possible duplicate impression. This is my inference from the code; I did not test it.
- Followers with "hide reposts" on see only the thread slice. Followers with "hide replies" on still see the self-thread slice, because self-threads survive `removeReplies`.
- For Discover, a self-repost adds one repost by the author. Nothing official says whether author self-reposts count as engagement. Plausibly they are ignored or carry little weight, but I could not verify this. Repost-as-item ("reposted by") is supported in feed-generator skeletons generally, but I found no evidence that Discover emits repost items. If Discover did surface a reposted reply as a repost item, the client would render it alone, without its parent.

### Gaps
- I have no official statement or measurement on whether reposts, or self-reposts specifically, influence Discover candidate selection or ranking. I also have no test of whether a reposted reply is more Discover-eligible than an un-reposted one.
- I did not verify server-side (AppView `getTimeline`) ordering or dedupe of a self-repost relative to the original reply. The rendering conclusions above come from the client's `main` branch as of 2026-11-19 and may differ in third-party clients.
