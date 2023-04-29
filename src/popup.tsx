import React from 'react'
import type { FC } from 'react'
import { useStorage } from '@plasmohq/storage/dist/hook'
import { filter, findIndex } from 'lodash-es'
import { useMemoizedFn } from 'ahooks'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import TopHeader from '~components/TopHeader'
import 'antd/dist/reset.css'
import './style.css'
import type { RuleItem } from '~components/Rule'
import Rule from '~components/Rule'
import { STORAGE_KEY } from '~store'
import 'overlayscrollbars/styles/overlayscrollbars.css'

interface Props {
}

const Popup: FC<Props> = (props) => {
  const [rules, setRule] = useStorage<RuleItem[]>(STORAGE_KEY)
  const handleDeleteOne = useMemoizedFn(async (value: RuleItem) => {
    await setRule(filter(rules, item => (item.id !== value.id)))
  })
  const handleEditRule = useMemoizedFn((value: RuleItem) => {
    const editIndex = findIndex(rules, ['id', value.id])
    rules.splice(editIndex, 1, value)
    void setRule(rules)
  })
  return <div className="w-[780px] h-[600px] overflow-y-visible bg-slate-300 flex flex-col">
    <TopHeader
      // onSuccess={run}
    />
    <OverlayScrollbarsComponent className="flex-1">
      <div className="p-4 w-full space-y-4">
        {rules?.map((rule) => {
          return <Rule
            data={rule}
            key={rule.id}
            onDelete={handleDeleteOne}
            onSubmit={handleEditRule}
          />
        })}
      </div>
    </OverlayScrollbarsComponent>
  </div>
}

export default Popup
