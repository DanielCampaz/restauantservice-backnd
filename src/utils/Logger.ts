import { ILoggerChild } from '../interfaces/ILoggerChild'
import { EnumColorLogger } from '../types.enum'
import ColorImplementation from './ColorImplementation'

export class Logger implements ILoggerChild {
  protected readonly color: EnumColorLogger
  protected readonly model: string
  protected readonly selectColor: string
  protected readonly completeModel: string
  protected readonly log = console.log

  constructor (_color: EnumColorLogger, _model: string) {
    this.color = _color
    this.model = _model.toUpperCase()
    this.selectColor = ColorImplementation.getColor(this.color)
    this.completeModel = `[${this.model}]: `
  }

  Log (message: string | number | boolean | symbol | object): void {
    if (typeof message === 'object' || typeof message === 'function') {
      this.log(this.selectColor, message)
    } else {
      const completeMessage: string = `${this.completeModel}${message.toString()}`
      this.log(this.selectColor, completeMessage)
    }
  }

  Error (message: string | number | boolean | symbol | object): void {
    if (typeof message === 'object' || typeof message === 'function') {
      this.log(ColorImplementation.getError(), message)
    } else {
      const completeMessage: string = `${this.completeModel}${message.toString()}`
      this.log(ColorImplementation.getError(), completeMessage)
    }
  }

  LogChild (context: string, message: string | number | boolean | symbol | object): void {
    if (typeof message === 'object' || typeof message === 'function') {
      this.log(this.selectColor, message)
    } else {
      const completeMessage: string = `${this.completeModel}[${context.toUpperCase()}]: ${message.toString()}`
      this.log(this.selectColor, completeMessage)
    }
  }

  ErrorChild (context: string, message: string | number | boolean | symbol | object): void {
    if (typeof message === 'object' || typeof message === 'function') {
      this.log(ColorImplementation.getError(), message)
    } else {
      const completeMessage: string = `${this.completeModel}[${context.toUpperCase()}]: ${message.toString()}`
      this.log(ColorImplementation.getError(), completeMessage)
    }
  }
}
