export interface ILoggerChild {
  LogChild: (context: string, message: string | number | boolean | symbol | object) => void
  ErrorChild: (context: string, message: string | number | boolean | symbol | object) => void
}
