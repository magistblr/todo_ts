import React from 'react'


type ButtonType = {
  todolistID: string
  removeTodo: (id: string) => void
}

export const Button = (props: ButtonType) => {
  return (
    <div>
      <button onClick={() => props.removeTodo(props.todolistID)}>x</button>
    </div>
  )
}


