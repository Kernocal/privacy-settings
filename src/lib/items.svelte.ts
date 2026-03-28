import type { Browser } from '#imports'
import { i18n } from '#imports'
import data from 'lib/data.json'
import { sidepanelLogger } from 'lib/logger'

// not allowed: { network: [''], services: [], websites: ['fledgeEnabled', 'topicsEnabled', 'relatedWebsiteSetsEnabled', 'adMeasurementEnabled'] }
// err: Extensions aren't allowed to enable Privacy Sandbox APIs.

type CategoryName = 'network' | 'services' | 'websites'

export type SettingItem = {
    labelKey: string
    setting: PrivacySetting<string> | PrivacySetting<boolean>
    descriptionKey: string
    defaultValue: string | boolean
}

type SettingsCategory = {
    name: CategoryName
    labelKey: string
    descriptionKey: string
    items: Record<string, SettingItem>
}

type CategoryData = Record<CategoryName, {
    items: Record<string, { default: string | boolean }>
}>

class PrivacySetting<T> {
    #setting: Browser.types.ChromeSetting<T>
    #property: string = ''
    #value: T = $state()!
    #levelOfControl: string = $state('')
    #ready: boolean = $state(false)

    constructor(setting: Browser.types.ChromeSetting<T>, property: string) {
        this.#setting = setting
        this.#property = property

        if (!setting) {
            this.#levelOfControl = 'disabled_by_browser'
            this.#ready = true
            return
        }

        setting.get({}).then((details) => {
            if (details) {
                this.#value = details.value
                this.#levelOfControl = details.levelOfControl
            }
            this.#ready = true
        })

        setting.onChange.addListener((details) => {
            this.#value = details.value
            this.#levelOfControl = details.levelOfControl
        })
    }

    get value(): T { return this.#value }
    set value(next: T) {
        if (!this.#setting) {
            return
        }

        this.#value = next
        void this.#setting.set({ value: next }).catch((e: unknown) => {
            sidepanelLogger.error(`Failed to set privacy setting: ${this.#property}, err: ${e}`)
        })
    }

    get levelOfControl(): string { return this.#levelOfControl }
    get ready(): boolean { return this.#ready }
}

function createPrivacySetting(category: CategoryName, property: string) {
    if (property === 'webRTCIPHandlingPolicy') {
        return new PrivacySetting<string>(browser.privacy.network.webRTCIPHandlingPolicy, property)
    }
    else {
        return new PrivacySetting<boolean>((browser.privacy[category] as any)[property], property)
    }
}

async function buildCategories(data: CategoryData) {
    const { os } = await browser.runtime.getPlatformInfo()
    const categories: Record<string, SettingsCategory> = {}

    for (const [category, { items: properties }] of Object.entries(data) as [CategoryName, CategoryData[CategoryName]][]) {
        const items: Record<string, SettingItem> = {}
        for (const [property, info] of Object.entries(properties)) {
            if (property === 'protectedContentEnabled' && os !== 'win' && os !== 'cros')
                continue
            items[property] = {
                labelKey: `settings.${category}.${property}.label`,
                setting: createPrivacySetting(category, property),
                descriptionKey: `settings.${category}.${property}.description`,
                defaultValue: info.default,
            }
        }
        categories[category] = { name: category, labelKey: `settings.${category}.label`, descriptionKey: `settings.${category}.description`, items }
    }
    return categories
}

export const webRTCPolicies = [
    { value: 'default', label: i18n.t('settings.webrtc.default') },
    { value: 'default_public_and_private_interfaces', label: i18n.t('settings.webrtc.default_public_and_private_interfaces') },
    { value: 'default_public_interface_only', label: i18n.t('settings.webrtc.default_public_interface_only') },
    { value: 'disable_non_proxied_udp', label: i18n.t('settings.webrtc.disable_non_proxied_udp') },
] as const

export const settingsCategories = buildCategories(data)
