const uppercaseLetter = /([A-Z])/g
const firstChar = /^./

export function capitalise(text: string): string {
    return text.replace(firstChar, char => char.toUpperCase())
}

export function formatSettingLabel(setting: string): string {
    switch (setting) {
        case 'webRTCIPHandlingPolicy':
            return 'WebRTC IP Handling Policy'
        default:
            return capitalise(setting.replace(uppercaseLetter, ' $1').trim().replace('Enabled', ''))
    }
}
