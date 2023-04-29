import { Storage } from '@plasmohq/storage'

export const STORAGE_KEY = 'RULE_LIST'

export const storage = new Storage({
  copiedKeyList: [STORAGE_KEY],
})
