import type { PlasmoCSConfig } from 'plasmo'
import { Network } from '@requestly/web-sdk'
import { template } from 'lodash-es'
import type { UpdateRuleData } from '~contents/message'

window.addEventListener('message', (evt: MessageEvent<UpdateRuleData>) => {
  if (evt?.data?.action === 'rule-list:update') {
    Network.clearInterceptors()
    evt?.data?.payload?.forEach((item) => {
      const rule = new RegExp(item.urlPattern.replace(/([.?+^$[\]\\(){}|\/-])/g, '\\$1').replace(/\*/g, '.*'))
      Network.intercept(rule, (args) => {
        const { method } = args
        if (method !== item.method)
          return null
        if (item.advancedMode) {
          const fn: unknown = template(`<% return ${item.javascriptBody} %>`)()
          return (fn as (args: Record<string, any>) => Record<string, any>)(args)
        }
        return {
          body: JSON.parse(item.jsonBody || 'null'),
          status: +(item.status) || 200,
        }
      }, true)
    })
  }
})

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
  world: 'MAIN',
  run_at: 'document_start',
}
