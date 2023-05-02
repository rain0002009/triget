import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Button, Collapse, Form, Input, InputNumber, Select, Switch, Tabs } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { changeEnumToList } from '~/utils'
import Editor from '~/components/Editor'

const { Panel } = Collapse
const { Item } = Form

const CommonSwitchProps = {
  getValueProps: (value: boolean) => {
    return {
      checked: value,
      value,
    }
  },
  normalize: (value) => {
    return !!value
  },
}

export enum Method {
  any = '*',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
}

const options = changeEnumToList(Method)

export interface RuleItem {
  id: number
  /**
   * 匹配URL
   */
  urlPattern: string
  /**
   * 匹配http方法
   */
  method: keyof typeof Method
  /**
   * 返回的http状态
   */
  status: number
  label?: string
  /**
   * 是否激活
   */
  active?: boolean
  /**
   * 返回的mock json字符串
   */
  jsonBody?: string
  /**
   * 高级模式时使用的js字符串
   */
  javascriptBody?: string
  /**
   * 是否使用高级模式
   */
  advancedMode?: boolean
}

interface Props {
  data?: RuleItem

  onSuccess?(): void

  onSubmit?(payload: RuleItem): void

  onDelete?(payload: RuleItem): void
}

const Rule: FC<Props> = ({ data, onSubmit, onDelete }) => {
  const [form] = Form.useForm()
  const active = Form.useWatch<boolean>('active', form)
  const advancedMode = Form.useWatch<boolean>('advancedMode', form)
  /**
   * 删除某条规则
   */
  const handleDelete = useMemoizedFn(() => {
    onDelete?.(data)
  })
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  return <Form<RuleItem>
    form={form}
    onFinish={onSubmit}
    layout="vertical"
    onValuesChange={() => {
      form.submit()
    }}
  >
    <Item
      name="id"
      hidden
    >
      <Input />
    </Item>
    <Collapse>
      <Panel
        header={<div
          className="flex items-center"
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <Item className="!mb-0 w-full" name="urlPattern">
            <Input disabled={active} />
          </Item>
          <Item
            className="!mb-0 ml-4"
            name="active"
            {...CommonSwitchProps}
          >
            <Switch />
          </Item>
          <Button
            className="ml-4"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          />
        </div>}
        key={1}
      >
        <div className="flex gap-2">
          <Item
            name="method"
            className="w-[100px]"
            label="请求方式"
          >
            <Select options={options} disabled={active} />
          </Item>
          <Item
            name="status"
            className="2-[120px]"
            label="状态"
          >
            <InputNumber disabled={active} />
          </Item>
          <Item
            name="label"
            label="标签"
          >
            <Input disabled={active} />
          </Item>
          <Item
            label="高级模式"
            name="advancedMode"
            {...CommonSwitchProps}
          >
            <Switch />
          </Item>
        </div>
        <Tabs
          type="card"
          items={[
            {
              label: advancedMode ? 'JAVASCRIPT' : 'JSON',
              key: 'JSON',
              children: advancedMode
                ? <Item
                  name="javascriptBody"
                >
                  <Editor
                    height={300}
                    language="javascript"
                  />
                </Item>
                : <Item
                  name="jsonBody"
                >
                  <Editor
                    height={300}
                    language="json"
                  />
                </Item>,
            },
          ]}
        />
      </Panel>
    </Collapse>
  </Form>
}

export default Rule
