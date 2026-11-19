// The command registry. To add a job, write commands/<name>.mjs exporting
// { name, summary, usage, options, run } and list it here.
import announce from './announce.mjs';

export const commands = new Map([announce].map((c) => [c.name, c]));
