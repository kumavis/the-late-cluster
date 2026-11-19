// The show's voice. Every word the bot posts comes from this file, so a human can
// edit the wording without touching any logic.
//
// Placeholders: {number} episode number (no padding), {title}, {url}, {tagline}.
// The URL must stay in the post template: the link facet is attached to it.
// Do not put @handles or hashtags here. The bot refuses post text that looks like
// it tags someone (see README, "No mentions").

export const SHOW_NAME = 'The Late Cluster with Larry Nx';

/** One of these opens each announcement, picked by episode number so a dry run and the
 *  live post for the same episode always say the same thing. */
export const TAGLINES = [
  'The puppets are warm, the desk is polished, and the cluster has been busy.',
  'New episode. Same desk. Fresh cluster gossip, delivered by synthesized heads.',
  'Larry Nx is back behind the desk. The band is mostly in tune.',
  'Tonight: the week in the simcluster, as told by puppets who were not invited.',
];

export const POST_TEMPLATE = `{tagline}

${SHOW_NAME}, episode {number}: {title}
{url}`;

/** The link card. Title and description come from the episode manifest. */
export const CARD_TITLE_TEMPLATE = `${SHOW_NAME} #{number}: {title}`;

export function fill(template, values) {
  return template.replace(/\{(\w+)\}/g, (m, key) => {
    if (!(key in values)) throw new Error(`voice template uses unknown placeholder ${m}`);
    return String(values[key]);
  });
}

export function taglineFor(number) {
  return TAGLINES[(number - 1) % TAGLINES.length];
}
