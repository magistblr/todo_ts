import React, { ChangeEvent, useState } from 'react'

type EditableSpanType = {
  title: string
  onChange: (newValue: string) => void
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
    props.onChange(title)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
}

  return ( edit
      ? <input value={title} onBlur={activateViewMode} onChange={onChangeHandler} autoFocus />
      : <span onDoubleClick={activateMode}>{title}</span>
  )
}
