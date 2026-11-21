# brand/

`avatar.png` is the show's Bluesky profile picture: Larry Nx, the host puppet, rendered from
the studio's own head, look and tux (`LOOKS.larry` in `packages/show/src/looks.js`) inside a
gold ring. It is generated. Do not edit it by hand.

```bash
npm run avatar                       # rewrites brand/avatar.png (the recommended variant)
npm run avatar -- --variant c        # another variant (a, b or c)
npm run avatar -- --out /tmp/x.png   # write somewhere else
npm run avatar -- --candidates       # all three, plus a contact sheet, in preview/_avatar/
```

The script is `scripts/avatar.mjs`. It serves the private page `scripts/avatar/` with Vite and
renders it in Playwright's Chromium, the same way `npm run shoot` does. The pose, face and time
are fixed and the renderer's randomness is seeded, so the same command gives the same file.

Limits:
- 1000×1000 PNG, sRGB, under 900,000 bytes. Bluesky refuses avatars over 1,000,000 bytes. The
  script checks all three and will not write a file that fails one.
- Bluesky crops the avatar to a circle and shows it as small as about 32 to 42 px in feeds.
  Everything that matters sits inside the ring, within the inscribed circle. Judge a change by the
  contact sheet's 42 px circles, not by the full-size picture.
- No words, handles or episode material: nothing is legible at that size.

The bot's commands read this file at this path (`brand/avatar.png`).

## The banner

`banner.png` is the account's banner: the title card's THE LATE / CLUSTER / with Larry Nx (the
studio's `logo()`) over the simcluster skyline from the set's window (the set's own `buildSkyline`
and `drawSkyline`, without the window frame), and no host, because Larry is the profile picture. It
is generated too; do not edit it by hand.

```bash
npm run banner -- --candidates       # all three, plus banner-sheet.png, in brand/candidates/
npm run banner                       # rewrites brand/banner.png (variant a, the owner's pick)
npm run banner -- --variant b        # another variant (a, b or c)
npm run banner -- --out /tmp/x.png   # write somewhere else
```

The script is `scripts/banner.mjs`, serving the private page `scripts/banner/` the same way the
avatar's does; the skyline is the set's seeded one frozen at one time, so the same command gives
the same file. Bluesky shows a banner cropped to 3:1 and refuses one over 1,000,000 bytes: the
script draws it at 3000×1000 and writes that as a PNG when it fits, else 1500×500 (sharp enough
for a 600-point desktop profile at 2× and a phone at 3×; the 3000-pixel PNGs come out 1.1 to 1.5
MB because of the glow), and refuses any file that is not 3:1 at one of those sizes, has no sRGB
chunk or is over the limit. It also measures where the title's lit pixels landed and refuses it
under the profile picture (bottom left, overlapping the banner's bottom 40 points on a phone) or
the phone's back and menu buttons (the top corners), or narrower than 140 points on a 390-point
phone. Judge a change by `banner-sheet.png`, which shows each candidate as a desktop and a phone
profile with `avatar.png` and the buttons drawn over it, not by the full-size picture. The bot's
`profile` command reads it at this path (`brand/banner.png`).
