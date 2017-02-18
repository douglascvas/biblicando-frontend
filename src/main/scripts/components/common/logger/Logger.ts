export interface Logger {
  log(...args: String[])
  error(...args: String[])
  warn(...args: String[])
  debug(...args: any[])
}
