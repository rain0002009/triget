import { toPairs } from 'lodash-es'

export function changeEnumToList(enumObj: Record<string, any>, fieldNames = { label: 1, value: 0 }, needChangeToNumber = false) {
  return toPairs(enumObj).map((item) => {
    return {
      label: item[fieldNames.label] as string,
      value: needChangeToNumber ? +(item[fieldNames.value] as string) : item[fieldNames.value] as string,
    }
  }) as { label: string; value: string }[]
}
