import React, { useState } from 'react'
import type { FC } from 'react'
import { Button } from 'antd'
import { DeleteOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { useStorage } from '@plasmohq/storage/dist/hook'
import Setting from '~components/Setting'
import { STORAGE_KEY } from '~store'
import type { RuleItem } from '~components/Rule'
import { Method } from '~components/Rule'

interface Props {
  onSuccess?(): void
}

const TopHeader: FC<Props> = ({ onSuccess }) => {
  const [store, setStoreValue] = useStorage<RuleItem[]>(STORAGE_KEY)
  const [open, setOpen] = useState(false)
  const handleDeleteAll = useMemoizedFn(async () => {
    await setStoreValue([] as RuleItem[])
  })
  const addRule = useMemoizedFn(async () => {
    await setStoreValue([
      ...(store || []),
      {
        id: +new Date(),
        urlPattern: '',
        method: Method.GET,
        status: 200,
        advancedMode: false,
      },
    ])
  })
  return <header
    className="p-[12px] bg-white flex"
  >
    <Button
      shape="circle"
      icon={<MenuOutlined />}
      onClick={() => {
        setOpen(true)
      }}
    />
    <Button
      className="ml-auto"
      shape="circle"
      icon={<DeleteOutlined />}
      onClick={handleDeleteAll}
    />
    <Button
      className="ml-4"
      icon={<PlusOutlined />}
      shape="circle"
      onClick={addRule}
    />
    <Setting
      open={open}
      onClose={() => {
        setOpen(false)
      }}
    />
  </header>
}

export default TopHeader
