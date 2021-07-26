import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from 'react'

type Input = {
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
  setError: Dispatch<SetStateAction<string | null>>
  setTitle: Dispatch<SetStateAction<string>>
  error: string | null
  title: string
  onKeyPressHandler: (e: KeyboardEvent<HTMLInputElement>) => void
}



export const Input = (props: Input) => {
  return (
    <div>
                  <input
                          value={props.title}
                          onChange={props.onChangeHandler}
                          className={props.error ? "error" : ""}
                          onKeyPress={props.onKeyPressHandler}
            />
    </div>
  )
}
