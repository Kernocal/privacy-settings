const firstChar = /^./

export function capitalise(text: string): string {
    return text.replace(firstChar, char => char.toUpperCase())
}
