import { EnumColorLogger } from '../types.enum'

export default class ColorImplementation {
  name: string = ''
  static colorDefault: EnumColorLogger = EnumColorLogger.Reset

  static getColor (color: EnumColorLogger): string {
    const keysEnumColorLogger = Object.values(EnumColorLogger)
    const colorSelect = keysEnumColorLogger.filter((v) => v === color)
    const ColorSelect = colorSelect[0]
    return `${ColorSelect}%s${this.colorDefault}`
  }

  static getError (): string {
    return `${EnumColorLogger.FgRed}%s${EnumColorLogger.Reset}`
  }
}
