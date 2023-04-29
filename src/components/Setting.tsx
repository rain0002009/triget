import React from 'react'
import type { FC } from 'react'
import type { DrawerProps } from 'antd'
import { Drawer } from 'antd'

interface Props extends DrawerProps {
}

const Setting: FC<Props> = (props) => {
  return <Drawer
    title="设置"
    width={400}
    placement='left'
    closable={false}
    {...props}
  >
    一些设置
  </Drawer>
}

export default Setting
