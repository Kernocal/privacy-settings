import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { storeData } from './storeData'

type GenAI = import('@google/genai').GoogleGenAI

const permissions = Object.keys(storeData.chrome.permissionJustifications)
const { description } = storeData.common

async function generatePermissionJustifications(
    ai: GenAI,
    model: string,
    permissions: string[],
    description: string,
): Promise<Record<string, string>> {
    const response = await ai.models.generateContent({
        model,
        contents: `You are writing Chrome Web Store permission justifications for a browser extension.

Extension description: ${description}
Permissions requested: ${permissions.join(', ')}

For each permission, write a clear, concise justification (1 sentence) explaining
why the extension needs this permission. Chrome reviewers will read these.

Rules:
- Be specific about what the permission is used for
- Reference the extension's actual functionality
- Keep each justification under 200 characters
- Do not use marketing language
- Do not start the justification with "to ".
- Do not start with The x permission or the permission x.
- Do not end the justification with a period.
- Do not start the justification with captilisation, first word can be lowercase.

Respond as JSON: { "permissionName": "justification text" }`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: 'object' as const,
                properties: Object.fromEntries(
                    permissions.map(p => [p, { type: 'string' as const }]),
                ),
                required: permissions,
            },
        },
    })

    return JSON.parse(response.text ?? '{}')
}

async function generateSinglePurpose(
    ai: GenAI,
    model: string,
    description: string,
): Promise<string> {
    const response = await ai.models.generateContent({
        model,
        contents: `You are writing a Chrome Web Store "single purpose" description for a browser extension.

Extension description: ${description}

Write a concise single-purpose statement (1 sentence) that describes what this extension does.
Chrome requires this to be a clear, single purpose. Keep it under 132 characters.`,
    })

    return response.text ?? ''
}

async function generateSearchTerms(
    ai: GenAI,
    model: string,
    description: string,
): Promise<string[]> {
    const response = await ai.models.generateContent({
        model,
        contents: `Generate search terms for a Microsoft Edge Add-ons listing.

Extension description: ${description}

Rules:
- Maximum 7 terms
- Each term max 30 characters
- Total max 21 words across all terms
- Terms should be what users would search to find this extension
- Include both specific and broad terms

Respond as JSON array of strings.`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: 'array' as const,
                items: { type: 'string' as const },
            },
        },
    })

    return JSON.parse(response.text ?? '[]')
}

(async () => {
    const { GoogleGenAI } = await import('@google/genai')

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
        console.error('GEMINI_API_KEY env var is required')
        process.exit(1)
    }

    const ai = new GoogleGenAI({ apiKey })
    const model = 'gemini-2.5-flash'

    const pause = () => new Promise<void>(res => setTimeout(res, 1000))

    const permissionJustifications = await generatePermissionJustifications(ai, model, permissions, description)
    console.log('Got permission justifications')
    await pause()
    const singlePurpose = await generateSinglePurpose(ai, model, description)
    console.log('Got single purpose')
    await pause()
    const searchTerms = await generateSearchTerms(ai, model, description)
    console.log('Got search terms')

    const resultJson = JSON.stringify({ permissionJustifications, singlePurpose, searchTerms }, null, 4)

    const outPath = resolve(fileURLToPath(import.meta.url), '..', 'data-suggestions.json')
    try {
        await writeFile(outPath, resultJson, 'utf-8')
        console.log('Finished: wrote suggestions to', outPath)
    }
    catch (error) {
        console.warn(`Failed to write suggestions to ${outPath}:`, error)
    }
})()
