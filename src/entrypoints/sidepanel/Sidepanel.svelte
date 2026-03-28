<script lang='ts'>
    import type { SettingItem } from 'lib/items.svelte'
    import { getAppConfig, i18n } from '#imports'
    import { settingsCategories, webRTCPolicies } from 'lib/items.svelte'
    import { capitalise } from 'lib/string'

    const collapsed = $state<Record<string, boolean>>({})
    const { browserName } = getAppConfig()
    const brand = browserName === 'chrome' ? 'Google' : 'Microsoft'
    const serviceProvider = browserName === 'chrome' ? 'Google' : 'Microsoft (plus Google)'

</script>

{#snippet itemDetails(item: SettingItem)}
    {@const setting = item.setting}
    <label class={[
        'p-3 border border-surface-border rounded-lg bg-surface-panel flex cursor-pointer transition-colors hover:(border-surface-border-hover bg-surface-panel-hover) items-start justify-between',
        typeof setting.value === 'string' ? 'flex-col gap-2' : 'gap-4',
    ]}>
        <span class='flex flex-1 flex-col'>
            <div class='flex gap-2 items-center'>
                <span class='text-sm font-medium'>{i18n.t(item.labelKey as any)}</span>
            </div>
            <span class='text-xs text-on-surface-muted leading-relaxed mt-1'>{i18n.t(item.descriptionKey as any, [capitalise(browserName), serviceProvider])}</span>
        </span>

        <div class={['flex flex-col items-end gap-1.5', typeof setting.value === 'string' && 'w-full']}>
            {#if typeof item.defaultValue === 'boolean'}
                <span class='text-xs text-on-surface-subtle font-bold mb-2 px-1 py-0.5 border border-surface-border rounded bg-black/20'>
                    {i18n.t('sidepanel.defaultLabel')} {item.defaultValue === true ? i18n.t('sidepanel.on') : i18n.t('sidepanel.off')}
                </span>
            {/if}

            <div class={['flex items-center relative', typeof setting.value === 'string' && 'w-full']}>
                {#if typeof setting.value === 'string'}
                    <select
                        bind:value={setting.value}
                        class='text-xs text-on-surface px-2 py-1.5 outline-none border border-surface-border rounded bg-surface-panel w-full transition disabled:opacity-50 focus:(ring-1 ring-accent)'
                    >
                        {#each webRTCPolicies as policy (policy.value)}
                            <option value={policy.value}>{policy.label}</option>
                        {/each}
                    </select>
                {:else if typeof setting.value === 'boolean'}
                    <input type='checkbox' bind:checked={setting.value} class='peer sr-only' />
                    <div class='rounded-full bg-surface-border h-5 w-10 transition-colors peer-checked:bg-accent peer-disabled:opacity-50'></div>
                    <div class='rounded-full bg-on-surface h-3 w-3 shadow-sm transition-transform left-1 top-1 absolute peer-checked:translate-x-5'></div>
                {/if}
            </div>
        </div>
    </label>
{/snippet}

<div class='text-on-surface font-sans p-6 bg-surface-bg min-h-screen'>
    <div class='mx-auto max-w-md'>
        <header class='mb-8'>
            <h2 class='text-xl tracking-tight font-bold'>
                {i18n.t('sidepanel.heading')}
            </h2>
            <p class='text-md text-on-surface-muted mt-2'><strong>{i18n.t('sidepanel.disclaimer')}</strong> {i18n.t('sidepanel.disclaimerText', [brand])}</p>
            <p class='text-md text-on-surface-muted'>{i18n.t('sidepanel.managedText')}</p>
            <a
                href={browserName === 'edge' ? 'https://learn.microsoft.com/en-us/microsoft-edge/extensions/developer-guide/api-support' : 'https://developer.chrome.com/docs/extensions/reference/api/privacy'}
                class='text-sm text-accent py-2 transition-colors hover:(text-accent-hover underline)'>
                {i18n.t('sidepanel.learnMore')}
            </a>
        </header>

        <div class='space-y-8'>
            {#await settingsCategories then categories}
                {#each Object.values(categories) as category (category.name)}
                    <section class='shadow-3xl p-5 rounded-xl bg-surface-panel transition-all'>
                        <button
                            onclick={() => collapsed[category.name] = !collapsed[category.name]}
                            class='group/header flex w-full items-center justify-between'
                            aria-expanded={!collapsed[category.name]}
                        >
                            <h2 class='text-lg font-bold flex gap-2 items-center'>
                                {i18n.t(category.labelKey as any)}
                            </h2>
                            <div class={[
                                'text-on-surface-subtle transition-transform duration-300 group-hover/header:text-accent',
                                collapsed[category.name] ? 'rotate-180' : '',
                            ]}>
                                <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6' /></svg>
                            </div>
                        </button>

                        {#if !collapsed[category.name]}
                            <div class='mt-4'>
                                <p class='text-sm text-on-surface-muted mb-4'>{i18n.t(category.descriptionKey as any, [capitalise(browserName), serviceProvider])}</p>
                                <div class='space-y-3'>
                                    {#each Object.values(category.items) as item (item.labelKey)}
                                        {@const isControllable = ['controllable_by_this_extension', 'controlled_by_this_extension'].includes(item.setting.levelOfControl)}
                                        {#if item.setting.ready && isControllable}
                                            {@render itemDetails(item)}
                                        {/if}
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </section>
                {/each}
            {/await}
        </div>
    </div>
</div>
