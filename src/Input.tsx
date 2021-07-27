import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from 'react'

type Input = {
  setError: Dispatch<SetStateAction<string | null>>
  setTitle: Dispatch<SetStateAction<string>>
  error: string | null
  title: string
  addTaskTodo: () => void
}






export const Input = (props: Input) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.setError(null)
    props.setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    props.setError(null)

    if(e.key === "Enter"){
        props.addTaskTodo()
    }
  }


  return (
    <div>
                  <input
                          value={props.title}
                          onChange={onChangeHandler}
                          className={props.error ? "error" : ""}
                          onKeyPress={onKeyPressHandler}
            />
    </div>
  )
}
