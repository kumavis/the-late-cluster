/** An expected failure: printed as a one-line message, exit code 1. */
export class BotError extends Error {
  constructor(message, { exitCode = 1 } = {}) {
    super(message);
    this.name = 'BotError';
    this.exitCode = exitCode;
  }
}

/** Bad command line: exit code 2. */
export class UsageError extends BotError {
  constructor(message) {
    super(message, { exitCode: 2 });
    this.name = 'UsageError';
  }
}
