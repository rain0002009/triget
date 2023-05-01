import type { PlasmoCSConfig } from 'plasmo'
import { STORAGE_KEY, storage } from '~store'
import type { RuleItem } from '~components/Rule'

export interface UpdateRuleData {
  action: 'rule-list:update'
  payload: RuleItem[]
}

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
  run_at: 'document_start',
}

function filterRule(item: RuleItem) {
  return item.active && item.urlPattern
}

async function init() {
  const data = await storage.get<RuleItem[]>(STORAGE_KEY)
  window.postMessage({
    action: 'rule-list:update',
    payload: data?.filter(filterRule),
  }, '*')
}

void init()
storage.watch({
  [STORAGE_KEY](data: { newValue: RuleItem[] }) {
    const payload = data?.newValue.filter(filterRule)
    window.postMessage({
      action: 'rule-list:update',
      payload,
    }, '*')
  },
})
