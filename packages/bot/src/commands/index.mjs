// The command registry. To add a job, write commands/<name>.mjs exporting
// { name, summary, usage, options, run } and list it here.
import announce from './announce.mjs';
import profile from './profile.mjs';
import dm from './dm.mjs';

export const commands = new Map([announce, profile, dm].map((c) => [c.name, c]));
