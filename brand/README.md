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
