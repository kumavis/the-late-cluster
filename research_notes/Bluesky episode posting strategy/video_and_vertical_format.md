# Video on Bluesky and the AT Protocol, with a focus on vertical (portrait) treatment (as of 19 Nov 2026)

Method note: the primary sources are Bluesky's own code (bluesky-social/atproto lexicons and bluesky-social/social-app source, `main` branch, read on 19 Nov 2026), the Bluesky public API, and press and analyst coverage. Code describes behaviour as built and may differ slightly from shipped app versions. docs.bsky.app now returns a 308 redirect to bsky.network/docs/..., and the page there came back empty when fetched, so the official video tutorial text could not be re-read this session.

## 1. Limits and requirements for native video posts

### Takeaway
As of Nov 2026: one MP4 per post (the app transcodes other inputs), up to **10 minutes** and **300 MB**, with a daily cap of 25 videos / 10 GB (last confirmed 2024; not reconfirmed in 2026 primary sources). The account needs a verified email. Up to 20 WebVTT caption tracks are allowed, one per language. Aspect ratio is declared as width/height on the record. A five-minute episode now fits as a single native video. It would not have fitted before 26 Aug 2026.

### Cited Findings
- **Timeline of duration limits:** launched Sept 2024 at 60 s ([Bluesky blog, 11 Sep 2024](https://bsky.social/about/blog/09-11-2024-video); [TechCrunch](https://techcrunch.com/2024/09/11/bluesky-catches-up-to-x-with-native-support-for-video)). Raised to 3 min in app v1.99 on 10 Mar 2025 ([Engadget](https://www.engadget.com/social-media/bluesky-adds-3-minute-video-uploads-and-inbox-management-features-220317950.html); [MacRumors](https://www.macrumors.com/2025/03/11/bluesky-extends-video-limit-latest-app-update/)). Raised to **10 min** on 26 Aug 2026, with uploads "2x-3x faster" ([TechCrunch, 26 Aug 2026](https://techcrunch.com/2026/08/26/bluesky-now-lets-you-upload-10-minute-long-videos/); [Bluesky post](https://bsky.app/profile/bsky.app/post/3mtwf7gxkwc2r)). A Threads post by an analyst wrongly calls the previous limit "two-minute"; TechCrunch says 3 min ([Threads](https://www.threads.com/@mattnavarra/post/DcgMqbPijZS/)). Some users reported still seeing the 3-minute limit right after the change, which suggests a staged rollout or the need to update the app ([GIGAZINE](https://gigazine.net/gsc_news/en/20260826-bluesky-post-video-10-min/)).
- **The official app's constants now read:** `VIDEO_MAX_DURATION_MS = 10 * 60 * 1000` and `VIDEO_MAX_SIZE_MB = 300` ("ISO megabytes", i.e. 300,000,000 bytes). Accepted input MIME types are `video/mp4`, `video/mpeg`, `video/webm`, `video/quicktime` and `image/gif`. The video service is `https://video.bsky.app` ([social-app src/lib/constants.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/constants.ts)).
- **File size history:** 100 MB at launch, raised to 300 MB in June 2026, ahead of the duration increase ([TechCrunch 2026](https://techcrunch.com/2026/08/26/bluesky-now-lets-you-upload-10-minute-long-videos/); a third-party client changelog says the same: [Aeronaut release notes, June 2026](https://releasebot.io/updates/aeronaut-for-bluesky)).
- **The lexicon `app.bsky.embed.video`** contains the following ([atproto lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/embed/video.json)):
  - `video`: a blob, accept `video/mp4`, maxSize 300000000 ("May be up to 300mb, formerly limited to 100mb").
  - `captions`: an array of up to **20** items. Each has `lang` (a language tag) and `file` (blob, `text/vtt`, max **20,000 bytes**).
  - `alt`: alt text.
  - `aspectRatio`: a ref to `app.bsky.embed.defs#aspectRatio`, i.e. integer width/height.
  - `presentation`: values "default" or "gif".
  - The view the AppView returns carries `playlist` (an HLS URI), `thumbnail`, `alt` and `aspectRatio`.
- **Daily cap and account requirements:** at launch the cap was 25 videos or 10 GB per day, "may be adjusted over time", and email verification was required to upload ([Bluesky blog 2024](https://bsky.social/about/blog/09-11-2024-video); [Engadget 2024](https://www.engadget.com/social-media/bluesky-now-lets-you-upload-videos-but-there-are-some-caveats-185702403.html)). The endpoint `app.bsky.video.getUploadLimits` returns `canUpload`, `remainingDailyVideos` and `remainingDailyBytes` per user ([lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/video/getUploadLimits.json)).
- **One video per post.** A post has a single embed, so a video cannot be combined with an external link card or with images ([lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/embed/video.json); secondary: [recurpost](https://recurpost.com/bluesky-scheduler/bluesky-post-size/)).

### Inferences
- A roughly five-minute episode under 300 MB can be posted as one native video. At 5 min, 300 MB allows an average bitrate of about 8 Mbps, which is ample for 1080p animation. Bluesky streams via HLS, so it transcodes anyway.
- Captions can be attached as .vtt files, up to 20 KB each. A five-minute dialogue track fits comfortably. Burned-in subtitles also work, since autoplay starts muted (see section 6).
- `aspectRatio` should be set to the true pixel dimensions. The official app's composer measures the file. API and scheduler uploads must set the field themselves, or clients fall back to 1:1 (see section 6).

### Gaps
- I did not find a 2026 primary source restating the 25 videos / 10 GB daily cap, or giving a maximum resolution or codec list for the uploaded file. The lexicon specifies only MP4. Resolution caps for the transcode outputs are unconfirmed.
- I could not re-read the official video tutorial, because docs.bsky.app redirects to bsky.network and the page returned no content.

## 2. Dedicated video surface in the official app

### Takeaway
Yes. Bluesky runs an official "Video" feed (`thevids`, described as "Trending videos in the Bluesky network") that opens as an immersive, full-screen, swipe-up player on iOS and Android. It is reached from Explore/Search ("Trending Videos"), from an interstitial in Discover, or by pinning it. It does **not** require vertical video. The player crops tall videos to fill the screen and letterboxes everything else. Profiles also have a Videos tab.

### Cited Findings
- **Launched 19 Jan 2025** as a vertical, swipe-up video feed during the TikTok ban uncertainty. Users can pin it or add it to their feeds, and tapping a video opens it full screen ([TechCrunch, 19 Jan 2025](https://techcrunch.com/2025/01/19/bluesky-launches-a-custom-feed-for-vertical-videos/); [Lindsey Gamble](https://lindseygamble.com/blog/bluesky-custom-video-feeds)). It is reached via a "Trending Videos" section in the Search/Explore tab on mobile. Ordinary feeds containing video do not drop you into the immersive player automatically, and users can build their own video feeds ([alternativeto](https://alternativeto.net/news/2025/1/bluesky-and-x-introduce-new-vertical-video-feeds-to-fill-tiktok-void); [Social Media Today](https://www.socialmediatoday.com/news/bluesky-adds-video-feed-decentralized-tiktok-alternative/737897/)).
- **The Videos tab on user profiles** arrived in v1.97, 27 Jan 2025 ([TechCrunch](https://techcrunch.com/2025/01/27/bluesky-adds-video-to-user-profiles); [Engadget](https://www.engadget.com/social-media/bluesky-adds-a-video-tab-to-user-profiles-193929994.html)).
- **Official feed metadata, read from the public API on 19 Nov 2026:** URI `at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/thevids`, displayName "Video", description "Trending videos in the Bluesky network", 7,139 likes ([getFeedGenerator](https://public.api.bsky.app/xrpc/app.bsky.feed.getFeedGenerator?feed=at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/thevids)). The feed is in the app's `PROD_FEEDS` / recommended list alongside Discover (`whats-hot`), and a `VIDEO_SAVED_FEED` constant pins it ([constants.ts](https://github.com/bluesky-social/social-app/blob/main/src/lib/constants.ts)).
- **Native only.** In the feed code, `areVideoFeedsEnabled = IS_NATIVE`, so the immersive video feed and its interstitial appear only in the iOS/Android apps, not on web. Custom feeds marked as video feeds render as a video grid ([PostFeed.tsx](https://github.com/bluesky-social/social-app/blob/main/src/view/com/posts/PostFeed.tsx)).
- **How the immersive player treats aspect ratio** (from the code; [VideoFeed/index.tsx](https://github.com/bluesky-social/social-app/blob/main/src/screens/VideoFeed/index.tsx)):
  - `isTallAspectRatio` returns true when width/height <= 9/16.
  - Such videos use `contentFit='cover'` and fill the phone screen, cropping slightly on taller phones.
  - Anything wider, including 4:5, 1:1 and 16:9, uses `contentFit='contain'`: shown whole, letterboxed on a black screen.
  - Videos autoplay and loop in this player.
- **Selection:** the feed is described only as "trending". I found no official statement of its ranking signals.

### Inferences
- Only 9:16 (or taller) gets the edge-to-edge, TikTok-style presentation. A 16:9 episode would play as a small strip in the middle of a vertical screen in this surface, which is a poor experience but not excluded.
- There is no evidence the feed filters out landscape videos. Its inclusion criterion appears to be trending engagement.

### Gaps
- No official documentation of how `thevids` ranks or selects videos (engagement thresholds, recency, aspect ratio, duration). No measured data on how much traffic it sends.
- Whether the `TrendingDiscoverValues` experiment, which places the trending-videos interstitial at Discover slice 30 by default, is enabled for all users.

## 3. Do Bluesky's own feeds (Discover etc.) treat video differently?

### Takeaway
There is no official statement that Discover boosts video, or vertical video specifically. The only structural special treatment is that Discover on mobile inserts a "Trending Videos" carousel that links to the Video feed. Whether a post gets in is decided by the Video feed's own selection.

### Cited Findings
- **The Discover interstitial in the code:** in the Discover feed, the app inserts trending topics at slice 5, suggested accounts at 15 and **trending videos at 30** (defaults, controlled by a feature flag). The videos interstitial shows only on native and only if the user hasn't disabled trending videos ([PostFeed.tsx](https://github.com/bluesky-social/social-app/blob/main/src/view/com/posts/PostFeed.tsx)). The carousel pulls from `VIDEO_FEED_URI` and links into that feed ([TrendingVideos.tsx](https://github.com/bluesky-social/social-app/blob/main/src/components/interstitials/TrendingVideos.tsx)).
- **The 2026 roadmap (January 2026)** focused on the Discover feed, real-time features, drafts and longer videos. I found nothing there about ranking video higher ([contentgrip](https://www.contentgrip.com/bluesky-2026-roadmap/); [mlq.ai](https://mlq.ai/news/bluesky-unveils-2026-roadmap-emphasizing-discover-feed-and-real-time-enhancements/)).
- **Links:** Bluesky has said it does not de-rank posts with links (reported secondhand by a blog, [SkyyCast](https://skyycast.com/blog/do-links-hurt-your-reach-on-bluesky)). I did not locate the primary staff statement.

### Inferences
- Any reach advantage for native video on Bluesky comes from the Video feed and its Discover carousel, plus the visual size and autoplay in the timeline. It does not come from a documented ranking boost.

### Gaps
- No measured, independent evidence on vertical versus landscape performance on Bluesky was found.

## 4. Video-only and video-first custom feeds

### Takeaway
The official "Video" feed (7.1k likes) is the main one. Users can build their own video feeds, which the app renders as grids or in the immersive player. I found no data on specific third-party video feeds' sizes, or on any that filter by aspect ratio or duration.

### Cited Findings
- Bluesky encouraged users to create dedicated video feeds at the Jan 2025 launch ([Social Media Today](https://www.socialmediatoday.com/news/bluesky-adds-video-feed-decentralized-tiktok-alternative/737897/)).
- Official feed likes: 7,139 as of 19 Nov 2026 ([public API](https://public.api.bsky.app/xrpc/app.bsky.feed.getFeedGenerator?feed=at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/thevids)).
- Skylight lets community curators create custom feeds ([TechCrunch Jan 2026](https://techcrunch.com/2026/01/26/tiktok-alternative-skylight-soars-to-380k-users-after-tiktok-u-s-deal-finalized)).

### Inferences
- The `aspectRatio` field is exposed in post views, so feed generators could filter by orientation. No example was found.

### Gaps
- I did not enumerate third-party video feeds (for example via feed directories such as goodfeeds or skyfeed). Their sizes and selection rules are unresearched.

## 5. Video-first third-party AT Protocol apps (2026)

### Takeaway
**Skylight** (TikTok-style, backed by Mark Cuban) is the largest, with 380k+ users and about 95k MAU in Jan 2026. It can show Bluesky videos and uses Streamplace for live and video infrastructure. **Spark** (formerly Reelo) is a TikTok-style app with its own `so.sprk` lexicons and its own AppView, and it cross-posts to Bluesky. **Bluescreen** (by the Flashes developer) is a client focused on Bluesky's own video posts. **Flashes** is an Instagram-style app focused on photos. TechCrunch says the Aug 2026 10-minute change applies to Bluescreen, Reelo and Skylight.

### Cited Findings
- **Skylight:**
  - Launched April 2025 with Mark Cuban backing ([TechCrunch Apr 2025](https://techcrunch.com/2025/04/01/mark-cuban-backs-skylight-a-tiktok-alternative-built-on-blueskys-underlying-technology)).
  - Passed **380,000 users**, about **95,000 MAU** in January so far, and **150,000+ videos** uploaded, after the TikTok US deal in late Jan 2026 ([TechCrunch, 26 Jan 2026](https://techcrunch.com/2026/01/26/tiktok-alternative-skylight-soars-to-380k-users-after-tiktok-u-s-deal-finalized)).
  - Has a built-in editor and curator feeds. Its AT Protocol integration lets it stream videos from Bluesky, and livestreaming comes through a Streamplace partnership (same source, and [Fast Company](https://www.fastcompany.com/91426929/what-is-skylight-tiktok-alternative-mark-cuban-at-protocol-bluesky-video)).
  - "40M+ users" figures on some sites are the network-wide total, not Skylight's.
  - No figures after Jan 2026 were found.
- **Spark / Reelo:**
  - Open-source short-form video and photo app. It uses its own AppView and sprk.so lexicons ([GitHub sprksocial/client](https://github.com/sprksocial/client); [Play Store](https://play.google.com/store/apps/details?id=so.sprk.app)).
  - Can share to Bluesky "as a one-minute direct upload or an embedded longer clip" (2025 description; [Expo blog](https://expo.dev/blog/how-we-built-a-tiktok-for-bluesky-with-expo); [sprk.so blog](https://sprk.so/blog/opening-up)).
  - Earlier coverage: [TechCrunch Jan 2025](https://techcrunch.com/2025/01/28/reelo-stands-out-among-the-apps-building-a-tiktok-for-bluesky).
- **Bluescreen:** an app "that will focus on videos posted to the Bluesky social network", by Sebastian Vogelsang, the Flashes developer ([TechCrunch, apps on AT Protocol](https://techcrunch.com/2025/03/30/beyond-bluesky-these-are-the-apps-building-social-experiences-on-the-at-protocol)).
- **Overview of the contenders:** [TechCrunch Feb 2025](https://techcrunch.com/2025/02/01/here-are-the-apps-battling-to-be-become-the-tiktok-for-bluesky).
- **Apps covered by the 10-minute change:** "Bluescreen, Reelo, and Skylight" ([TechCrunch Aug 2026](https://techcrunch.com/2026/08/26/bluesky-now-lets-you-upload-10-minute-long-videos/)).

### Inferences
- A video posted with the standard `app.bsky.embed.video` record will appear in Bluescreen, and probably in Skylight's Bluesky-sourced streams. It would not natively appear in Spark's own `so.sprk` feed. These apps are vertical-first, so 9:16 is the shape that suits them.

### Gaps
- I could not confirm whether Skylight shows landscape Bluesky videos, or only vertical ones, or how it selects Bluesky-origin videos.
- No 2026 user figures for Spark, Bluescreen or Flashes. I could not inspect Spark's lexicon files (not found on the default branch).

## 6. Timeline behaviour for viewers

### Takeaway
Timeline videos autoplay **muted** by default (users can disable autoplay), and the mute state is shared across videos. In feeds on phones, a video box is capped at 14:9 tall (height about 1.56 × width). A 9:16 or 4:5 video therefore takes roughly 2.2 to 2.8 times the vertical screen space of a 16:9 one. On web the cap is square. Posting a video uses up the single embed, but the post text can still carry a clickable link facet to the episode page.

### Cited Findings
- **Size in feeds** ([VideoEmbed/index.tsx](https://github.com/bluesky-social/social-app/blob/main/src/components/Post/Embed/VideoEmbed/index.tsx); [AutoSizedImage.tsx](https://github.com/bluesky-social/social-app/blob/main/src/components/images/AutoSizedImage.tsx)):
  - Aspect ratios are first clamped to "max of 1:2 ratio in feeds".
  - On native, the container's height/width ratio is `min(1/aspectRatio, 14/9)` ("slightly smaller max height than images", which use 16:9).
  - On web it is `min(1/aspectRatio, 1)`.
  - If `aspectRatio` is missing, the app falls back to 1:1.
  - Worked out: on a phone, a 16:9 video is 0.56 × width tall; 1:1 is 1.0 ×; 4:5 is 1.25 ×; 9:16 is capped at 1.56 ×.
- **Autoplay and mute** ([VideoEmbedInnerNative.tsx](https://github.com/bluesky-social/social-app/blob/main/src/components/Post/Embed/VideoEmbed/VideoEmbedInner/VideoEmbedInnerNative.tsx)):
  - `autoplay = !autoplayDisabled && !isWithinMessage`, so autoplay can be turned off in settings.
  - `beginMuted` follows a shared mute state, which starts muted.
  - The immersive Video feed autoplays and loops ([VideoFeed/index.tsx](https://github.com/bluesky-social/social-app/blob/main/src/screens/VideoFeed/index.tsx)).
- **Single embed:** a post holds one embed, so a video and a link card cannot share a post. Rich-text link facets in the post body are separate from the embed (the `embed` and `facets` fields are separate in `app.bsky.feed.post`; [lexicon](https://github.com/bluesky-social/atproto/blob/main/packages/api/lexicons/app/bsky/embed/video.json)).

### Inferences
- For timeline real estate on phones, anything 4:5 or taller is much bigger than 16:9. 9:16 hits the 14:9 cap and also gets full-screen treatment in the Video feed.
- Burned-in captions or text-on-screen matter, because playback starts muted.
- A practical pattern: native video, with "full episode / site: <link>" in the post text as a facet, or a reply carrying the link card.

### Gaps
- Whether looping applies in the main timeline (not just the immersive feed) was not verified in code.
- Whether Bluesky's player shows a 10-minute video with any length-related UI differences was not verified.

## 7. Engagement evidence and ideal length

### Takeaway
The only large dataset found (Buffer, Mar 2026) shows median interactions on Bluesky of video 5, images 4, links 3 and text 3. It is labelled early-stage. No reliable Bluesky-specific data on ideal video length or on vertical versus landscape was found.

### Cited Findings
- **Buffer, published 19 Mar 2026:** in the Bluesky sample, video posts had a median of 5 total interactions (25% more than images), images 4, and links and text 3 each. The sample was 253k video posts and over 2M image posts. Buffer calls it "early-stage", "a first look rather than a final verdict", and notes video is far less common than images on the platform ([Buffer](https://buffer.com/resources/data-best-content-format-social-media/)). These are analyst figures, measured with a median rather than an engagement rate.
- **Anecdotal and vendor evidence:**
  - Creators report that link posts do relatively well on Bluesky compared with other platforms ([peggyktc, Nov 2024](https://www.peggyktc.com/2024/11/creator-weekly-bluesky-likes-links.html)).
  - A vendor study of about 1.2k posts with unverified methods: [atiskel](https://atiskel.com/blog/post.php?slug=bluesky-post-types-engagement-study).
  - A marketer guide says native video drives engagement while links drive traffic. This is qualitative ([dlvr.it](https://dlvrit.com/blog/bluesky-video/)).
- **Context:** Bluesky's active users were down more than 25% year on year as of July 2026, per Similarweb ([TechCrunch Aug 2026](https://techcrunch.com/2026/08/26/bluesky-now-lets-you-upload-10-minute-long-videos/)).

### Inferences
- Native video likely earns modestly more on-platform interactions than a link card, but it sends fewer clicks to the web page. The trade-off depends on whether the goal is reach or visits.

### Gaps
- No data on completion rates or optimal length. Bluesky does not expose view counts publicly in the app, and none were found in sources.

## 8. Live and longer-form video

### Takeaway
Bluesky itself hosts only pre-recorded video (now up to 10 minutes). Live video is handled by Streamplace, a separate open-source AT Protocol service, and by "Live Now" badges that link out. Neither is needed for a pre-rendered five-minute show, which now fits natively.

### Cited Findings
- Streamplace is an open-source, self-hostable livestreaming, clips and video upload platform for the AT Protocol, and it powers Skylight ([Livepeer docs, updated June 2026](https://docs.livepeer.org/v2/solutions/streamplace/overview); [FOSDEM 2026 talk](https://fosdem.org/2026/schedule/event/decentralized_public_broadcast_with_streamplace)).
- Bluesky's "Live Now" status initially supported only Twitch links. Coverage says Bluesky emphasises linking out to external streams rather than hosting live video ([contentgrip](https://www.contentgrip.com/bluesky-2026-roadmap/)). Secondary sources report Streamplace integration with the badge (not verified against a primary source).
- The app code includes a `liveEventFeedsAndTrendingBanner` row in Discover, which indicates live-event feed promotion exists ([PostFeed.tsx](https://github.com/bluesky-social/social-app/blob/main/src/view/com/posts/PostFeed.tsx)).

### Inferences
- Before Aug 2026, a five-minute show would have needed trimming or Streamplace or another host. Now native upload covers it.

### Gaps
- I could not confirm a primary source for the exact Live Now / Streamplace integration date.
