# 8. Direction and visual comedy

A segment's `index.js` is its direction: shots, puppet acting, graphics. The API, the shot list and
the studio's kit are in `packages/show/README.md`. This chapter is the principles. Stage each
segment from its script and its cues, not from an idea of how the show usually looks.

## Television

**Nothing is put on screen for the viewer to read in silence.** A post that is shown is performed,
or read aloud, or is short enough to take in at a glance.

*Why.* A viewer cannot read a paragraph and watch a show at the same time, and most will do neither.
A card of unread text is dead air with a picture of words on it. It also wastes the one thing this
show has that the timeline does not: voices.

What follows from it:

- **Performed** means the author's puppet says it, under chapter 9's rules, with the card up and the
  words lighting as they are spoken.
- **Read aloud** means a house character reads it exactly, as the post it was, naming whose it is,
  with the card up. This is Sibyl's job. Reading is not paraphrase: the words are the post's
  words, and `as` only respells.
- **A glance** is one short block of about eight words or fewer: a label, a number, a short post, a
  verdict. The gate that checks this uses the tool's own limit; write to eight.
- **A long post is cut honestly or left out.** Perform the part that carries it, mark the cut with an
  ellipsis that keeps the meaning (R4), and show only what is spoken, or show the whole post and
  light the part being read. If no honest cut exists and there is no time to read it all, do not
  show it. Never hold a long post on screen while someone talks about something else.
- **Budget the reading.** Speech runs at about two and a half words a second. A thirty-word post read
  aloud is twelve seconds of the episode. Decide that it is worth twelve seconds, or choose a
  shorter post.
- **Sung lyrics shown as they are sung** count as performed.
- **The credits and the disclaimer** are the constitution's and are exempt. Keep them large and slow
  enough to read anyway.
- **Screen-only jokes are glance-sized.** A tag the voice does not say is welcome at three words and
  a failure at thirty.
- **Show the thing, not text about the thing.** When material is something a person made, the
  picture is the thing working
  ([what good material looks like](05-material.md#what-good-material-looks-like)).

*Illustration, constructed.* The allotment society's secretary posted sixty words about the
hosepipe rota. Wrong: the whole post on a card for six seconds while Larry says "The secretary had
thoughts." Right: Sibyl reads the eleven words that are the point, those words lit on a card that
shows the cut, and the rota itself drawn beside her, visibly impossible.

## Principles

### 1. A joke is not finished until something is staged

Nearly every punch should have a picture: a prop, a chart, a card being read, a puppet doing
something. Write the picture into the script as a `cue` at the punch and draw it in `index.js`.

### 2. Land the picture on the word

Sync to the word, not the line. Word timings are in `show.line(id).words`. A picture that arrives
half a second late reads as decoration. On time, it is the punch.

### 3. Frame for what is being shown

- Leave room in the frame for the thing: the presenter in one third and the picture in the rest, or
  the host slid aside so something can build beside him.
- Pull back when something appears in the studio, so that it and whoever reacts share the frame.
- Cut to a wide, or push in, for a reveal.

### 4. Cut on the turn, push on the punch, widen for an arrival

Cut freely: a change of shot every four to six seconds in a talking segment. A static head for more
than eight seconds is a problem unless the words are the point.

### 5. Reactions are jokes

Heads turn, nod, tilt and shake. Use them.

| acting | reads as |
|---|---|
| looking at the camera | talking to us |
| looking at the speaker | listening |
| looking at the picture, then back | presenting it |
| a small nod late in a line | selling the punch |
| a tilt | wistful or sheepish |
| a shake | a flinch |
| looking away and leaning back | refusal |
| left, right, camera, quickly | realisation |
| growing a little | a wind-up |
| entering from an edge of the frame | an arrival |

Who looks at whom carries the relationships.

### 6. One focal point at a time, and enough time

The eye goes to motion and brightness. Introduce one new thing at a time. Anything with words on it
stays up for as long as it is being spoken.

### 7. Real things look real; invented things look invented

- **Real posts** go on a post card with the real display name, handle, date and like count, and the
  exact text. Add a short provenance label where it helps.
- **Invented posts, accounts and sites** use names that cannot belong to anyone: handles and
  addresses under `.example`, or a display name only (R8). Label them as the show's.
- **When real and invented numbers share a board, label each.**
- Never put invented words on a card with a real person's handle.
- If a figure has changed since the moment being shown, say which moment the figure is from.

### 8. Chyrons

The name and handle on a chyron are accurate. A house character's title can be a joke about this
week. A guest's title says why they are here, truthfully and kindly, and carries PUPPET · PARODY.

### 9. Mind the frame budget

Four heads plus graphics holds 60 frames a second on a laptop. Heads are expensive: prefer shots
with few visible heads, and build heavy geometry once in `setup`.

## The studio's kit is a vocabulary, not a style

The kit has drawing primitives: post cards, stamps, split-flap boards, charts, tickers, monitors,
lecterns and more (`packages/show/README.md` lists them). Use what the segment needs.

- **A primitive is not a joke.** The same reveal on every punch becomes a tic. Vary how things
  arrive: drawn on, flipped, carried in, already there when the camera turns.
- **Do not keep anything on screen from segment to segment** unless the script asks for it. The
  studio has no fixtures beyond the set.
- **New props live with the episode** that made them and move into the kit only when a second
  episode needs them.
- Keep to each house character's colour, and use red and green for verdicts.

## The vector look

- Everything is light on black. Lines add, so fill black behind any graphic that sits over the set
  (`occlude`), or overlaps turn to mush.
- Capitals read best. Lower case is for posts and handles.
- At most three blocks of text on screen at once, the caption included.
- Keep big graphics above y ≈ 610; the captions live below it. Or hide the caption for that moment.
- Glow is for the one thing you want looked at.
- Fades by the context's alpha do not work on beams and labels; move or scale things in and out.

## Anti-patterns

- Text nobody reads aloud.
- Graphics that print the line just spoken and add nothing.
- Text in the caption band.
- Invented text on a real-looking card.
- A real project described in words when it could have been shown working.
- State carried from frame to frame in `direct` or `draw*` (flags, running totals,
  `Math.random()`). Compute everything from `t`, so seeking and frozen frames work.
- Twenty seconds in which nothing is shown or done.

## Review your frames

Shoot frames at every punch word, every cue, every shot change and every overlap, in one batch, and
look at each one.

- Is the punch's picture on screen at the punch?
- Is there any text that is not being spoken and is more than a glance?
- Is anything unreadable, overlapping, under the captions, or showing through without a black fill?
- **Shoot the credits too.** They must name the real accounts whose personas were played and say that
  every voice is synthesized (Article 4, R9). Credits are the easiest thing to leave unchecked.
