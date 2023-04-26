import settings from './json/stettings.json'

export const NameApplication = settings.name
export const VersionApplication = settings.version
export const DescriptionApplication = settings.description
export const PortServer = settings.port

export const host: string = `localhost:${PortServer}/api-v${VersionApplication}`
