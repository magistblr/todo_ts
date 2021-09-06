import { TextField } from '@material-ui/core'
import React, { ChangeEvent, useState } from 'react'

type EditableSpanType = {
  title: string
  callback: (newValue: string) => void
}


export const EditableSpan = (props: EditableSpanType) => {
  let [edit, setEdit] = useState(false)
  let [title, setTitle] = useState(props.title)

  const activateMode = () => {
    setEdit(true)
    setTitle(title)
  }

  const activateViewMode = () => {
    setEdit(false)
    props.callback(title)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
}

  return ( edit
      ? <TextField value={title} variant="outlined" onBlur={activateViewMode} onChange={onChangeHandler} autoFocus />
      : <span onDoubleClick={activateMode}>{title}</span>
  )
}