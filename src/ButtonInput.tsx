import React, { Dispatch, SetStateAction } from 'react'

type ButtonInputType = {
  setError: Dispatch<SetStateAction<string | null>>
  setTitle: Dispatch<SetStateAction<string>>
  error: string | null
  title: string
  addTask: (todolistID: string, title: string) => void
  addTaskTodo: () => void
}




export const ButtonInput = (props:ButtonInputType) => {



  return (
    <div>
            <button onClick={() => props.addTaskTodo()} >+</button>
    </div>
  )
}
