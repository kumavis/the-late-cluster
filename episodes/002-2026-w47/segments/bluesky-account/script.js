// bluesky-account: "The Handle". About ten seconds at the desk: Larry has a Bluesky account, shows
// the handle, and reads it for his own name. One joke. (Format: packages/show/tools/README.md.)
// Render: npm run render -- 2 bluesky-account   ·   verify: npm run check -- 2 bluesky-account
//
// The owner's note (production/owner-notes.md, 21 November 2026): a quick "finally got a bluesky
// account" bit, somewhere, where Larry shows his account handle.
//
// FREE-STANDING. No line here names what came before or what comes next, and no other segment
// refers to this one, so it can be moved or dropped without touching another script. Where it sits
// and why is in production/assembly-2.md.
//
// WHAT IT STATES ABOUT THE ACCOUNT, and all it states: that there is one, that it is new, and its
// handle, exactly @latecluster.simcluster.tv (production/owner-notes.md). That Larry's name is not
// in the handle can be read off the handle. Nothing else about the account is said or shown: no
// count, no post, no repost, no bio, no label, no reply from anyone, and no other account.
//
// IT IS NOT THE INVITATION. The making-of tells the cluster what the handle is for, how to type
// it, and the terms. This says none of that: no word about tagging, pointing, mentioning,
// following, posting or replying, and nothing asked of the viewer. Here the handle is shown and
// never read aloud or typed; there it is typed a character at a time and read out.
//
// The script has been fitted by a sound editor; its lines carry `as`.
export default {
  id: 'bluesky-account',
  title: 'The Handle',
  gap: 0.28,
  beats: [
    // PICTURE: Larry at the desk, alone, a host's medium shot, his chyron up as in any segment:
    // his name, and nothing under it. Nothing new is on screen yet.
    { cue: 'desk', at: 0 },
    { say: 'larry', id: 'account', text: 'I finally got a Bluesky account. This is my handle.', as: 'I finally got a Blue-Sky account. This is my handle.' },

    // PICTURE, on the word "handle" (take the moment from the line's word timings): the handle
    // comes on under his name, where a guest's chyron carries the guest's handle, but large, most
    // of the width of the frame, the biggest writing on screen:
    //     @latecluster.simcluster.tv
    // exactly that, whole at once, in the studio's plain line colour. It is not gold: gold is
    // Larry's, and that is the joke. It stays up to the last frame of the segment.
    // NOT IN THE PICTURE: a post box, a cursor, typing, or the colour a mention turns (all four
    // belong to the making-of); a profile card of any kind (no avatar, bio, counts, label, button
    // or post); any other handle; anything arriving in answer.
    { cue: 'handle-in', at: -0.45 },

    // PICTURE: Larry looks down at it and reads. A thin gold underline, his eye, runs under the
    // handle from the @ to the v: once during this line, and once more, quicker, in the pause
    // after it. It stops on nothing.
    { cue: 'read-twice', at: 0.28 },
    { say: 'larry', id: 'twice', text: 'I have read it twice.', as: 'I have red it twice.' },

    // PICTURE, on "not": the underline goes out. Larry looks up at the lens. His name is above,
    // the handle below, and there is no gold anywhere in the handle. He takes it well.
    { say: 'larry', id: 'not-in-it', text: "I'm not in it.", as: "I'm not inn it.", rate: 0.9, gap: 0.9 },
    { cue: 'left-out', at: -0.8 },
    { sfx: 'laugh', at: 0.15, hold: 0.6 },
  ],
}
