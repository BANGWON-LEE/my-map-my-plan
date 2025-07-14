'use client'

import React from 'react'
import type { DatePickerProps } from 'antd'
import { DatePicker } from 'antd'
import { SetState } from '@/type/common'

export default function CalandarBox(props: {
  setState: SetState<string | string[]>
}) {
  const { setState } = props

  function onChange(
    date: DatePickerProps['value'],
    dateString: string | string[],
    setState: SetState<string | string[]>
  ): void {
    console.log(
      date,
      '<===>',
      typeof date,
      ' | ',
      dateString,
      '<===>',
      typeof dateString
    )

    const isoDate = date ? date.toISOString() : ''

    console.log('isoDate', isoDate)

    setState(isoDate)
  }

  return (
    <DatePicker
      onChange={(date, dateString) => onChange(date, dateString, setState)}
    />
  )
}
