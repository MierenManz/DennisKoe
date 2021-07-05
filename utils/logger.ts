import { serverConfig } from "./config_files.ts";
type LogLevels = "Warn" | "Debug" | "Log" | "Error" | "Info";
type DebugLevel = 0 | 1 | 2;

interface LoggingData {
  file: string;
  coloredString: string;
  uncoloredString: string;
}

interface Settings {
  directory?: string;
  disableColors?: boolean;
  debugLevel: 0 | 1 | 2;
}

const reset = "\x1b[0m";

class Logger {
  #colorDict: Record<LogLevels, string> = {
    Warn: "\x1b[33m",
    Debug: "\x1b[90m",
    Log: "\x1b[92m",
    Error: "\x1b[91m",
    Info: "\x1b[36m",
  };

  #colors: boolean;
  #logDir: string | undefined;
  #debugLevel: 0 | 1 | 2;

  #timeFormat = Intl.DateTimeFormat("nl-NL", {
    timeStyle: "medium",
    hourCycle: "h24",
  });

  #fileFormat = Intl.DateTimeFormat("nl-NL", {
    dateStyle: "short",
  });

  public constructor(settings: Settings) {
    this.#colors = !(settings?.disableColors ?? false);
    this.#logDir = settings?.directory;
    this.#debugLevel = settings.debugLevel;
    if (this.#logDir) Deno.mkdirSync(this.#logDir, { recursive: true });
    return;
  }

  public warning(data: string): void {
    const out = this.#formatting("Warn", data);
    this.#writeConsole(out.coloredString);
    if (this.#logDir) this.#writeFile(out.file, out.uncoloredString);
  }

  public debug(data: string): void {
    if (this.#debugLevel > 0) {
      const out = this.#formatting("Debug", data);
      this.#writeConsole(out.coloredString);
      if (this.#logDir && this.#debugLevel === 2) {
        this.#writeFile(out.file, out.uncoloredString);
      }
    }
  }

  public log(data: string): void {
    const out = this.#formatting("Log", data);
    this.#writeConsole(out.coloredString);
    if (this.#logDir) this.#writeFile(out.file, out.uncoloredString);
  }

  public error(data: string): void {
    const out = this.#formatting("Error", data);
    this.#writeConsole(out.coloredString);
    if (this.#logDir) this.#writeFile(out.file, out.uncoloredString);
  }

  public info(data: string): void {
    const out = this.#formatting("Info", data);
    this.#writeConsole(out.coloredString);
    if (this.#logDir) this.#writeFile(out.file, out.uncoloredString);
  }

  #formatting(level: LogLevels, data: string): LoggingData {
    const today = new Date();
    const file = this.#fileFormat.format(today) + ".log";

    const time = this.#timeFormat.format(today);

    const color = this.#colorDict[level];
    // deno-fmt-ignore
    const coloredString = "[\x1b[35m" + time + reset + "]  -  [" + color + level + reset + "]\t=>   " + color + data + reset + "\n";
    // deno-lint-ignore no-control-regex
    const uncoloredString = coloredString.replace(/\x1b\[[0-9;]*m/g, "");
    return {
      file,
      coloredString: this.#colors ? coloredString : uncoloredString,
      uncoloredString: uncoloredString,
    };
  }

  #writeConsole(data: string): void {
    // deno-lint-ignore no-explicit-any
    return (Deno as any).core.print(data);
  }

  #writeFile(filename: string, data: string): void {
    Deno.writeTextFileSync(this.#logDir + filename, data, {
      create: true,
      append: true,
    });
    return;
  }
}

export const logger = new Logger(serverConfig.logger);
