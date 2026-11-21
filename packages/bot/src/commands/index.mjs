// The command registry. To add a job, write commands/<name>.mjs exporting
// { name, summary, usage, options, run } and list it here.
import announce from './announce.mjs';
import post from './post.mjs';
import reply from './reply.mjs';
import profile from './profile.mjs';
import dm from './dm.mjs';
import repost from './repost.mjs';

export const commands = new Map([announce, post, reply, profile, repost, dm].map((c) => [c.name, c]));
