import * as React from 'react'

type Props = object | [object, ...(string)[]]

const Mayre: React.ComponentClass<{
  of: React.ReactNode
  or?: React.ReactNode
  orWith?: Props
  when?: boolean | ((...args?: any[]) => boolean)
  with?: Props
}>

export default Mayre
