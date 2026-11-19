// Argument parsing and dispatch. Commands receive everything they touch through
// `ctx`, so tests can inject the environment, fetch, clock and output.
import { parseArgs } from 'node:util';
import { resolve } from 'node:path';
import { commands } from './commands/index.mjs';
import { CONFIG_PATH, REPO_ROOT } from './config.mjs';
import { BotError } from './errors.mjs';

function help() {
  const lines = ['usage: npm run bot -- <command> [args]', '', 'commands:'];
  for (const c of commands.values()) lines.push(`  ${c.usage.padEnd(36)} ${c.summary}`);
  lines.push('', 'Dry run is the default. Nothing is posted without --live. See packages/bot/README.md.');
  return lines.join('\n');
}

export async function main(argv, io = {}) {
  const {
    env = {}, stdout = process.stdout, stderr = process.stderr, fetch = globalThis.fetch,
    cwd = process.cwd(), now = () => new Date(), root, configPath = CONFIG_PATH,
  } = io;
  const out = (s) => stdout.write(`${s}\n`);
  const err = (s) => stderr.write(`${s}\n`);

  const [name, ...rest] = argv;
  if (!name || name === 'help' || name === '--help' || name === '-h') {
    out(help());
    return name ? 0 : 2;
  }
  const command = commands.get(name);
  if (!command) {
    err(`unknown command "${name}"\n\n${help()}`);
    return 2;
  }
  try {
    for (const arg of rest) {
      const flag = arg.replace(/^--?/, '').split('=')[0];
      if (arg.startsWith('-') && command.rejected?.[flag]) throw new BotError(command.rejected[flag], { exitCode: 2 });
    }
    let parsed;
    try {
      parsed = parseArgs({ args: rest, options: command.options, allowPositionals: true, strict: true });
    } catch (e) {
      throw new BotError(`${e.message}\nusage: ${command.usage}`, { exitCode: 2 });
    }
    return await command.run({
      positionals: parsed.positionals,
      values: parsed.values,
      env, fetch, cwd, now, configPath, out, err,
      root: resolve(cwd, parsed.values.root ?? root ?? REPO_ROOT),
    });
  } catch (e) {
    if (e instanceof BotError) {
      err(`error: ${e.message}`);
      return e.exitCode;
    }
    err(`error: ${e.message}`);
    return 1;
  }
}
