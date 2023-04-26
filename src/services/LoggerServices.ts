import { EnumColorLogger } from '../types.enum'
import ColorImplementation from '../utils/ColorImplementation'

class LoggerServices {
  protected readonly color: EnumColorLogger
  protected readonly model: string
  protected readonly selectColor: string
  protected readonly log = console.log

  constructor () {
    this.color = EnumColorLogger.FgBlack
    this.model = 'Services'.toUpperCase()
    this.selectColor = ColorImplementation.getColor(this.color)
  }

  Log (contextF: string, message: string | number | boolean | symbol | object): void {
    if (typeof message === 'object' || typeof message === 'function') {
      this.log(this.selectColor, message)
    } else {
      const completeMessage: string = `[${contextF.toUpperCase()}_${this.model}]: ${message.toString()}`
      this.log(this.selectColor, completeMessage)
    }
  }

  Error (contextF: string, message: string | number | boolean | symbol | object): void {
    if (typeof message === 'object' || typeof message === 'function') {
      this.log(ColorImplementation.getError(), message)
    } else {
      const completeMessage: string = `[${contextF.toUpperCase()}_${this.model}]: ${message.toString()}`
      this.log(ColorImplementation.getError(), completeMessage)
    }
  }

  LogChild (contextF: string, context: string, message: string | number | boolean | symbol | object): void {
    if (typeof message === 'object' || typeof message === 'function') {
      this.log(this.selectColor, message)
    } else {
      const completeMessage: string = `[${contextF.toUpperCase()}_${this.model}]: [${context.toUpperCase()}]: ${message.toString()}`
      this.log(this.selectColor, completeMessage)
    }
  }

  ErrorChild (contextF: string, context: string, message: string | number | boolean | symbol | object): void {
    if (typeof message === 'object' || typeof message === 'function') {
      this.log(ColorImplementation.getError(), message)
    } else {
      const completeMessage: string = `[${contextF.toUpperCase()}_${this.model}]: [${context.toUpperCase()}]: ${message.toString()}`
      this.log(ColorImplementation.getError(), completeMessage)
    }
  }
}

export const loggerServices: LoggerServices = new LoggerServices()
