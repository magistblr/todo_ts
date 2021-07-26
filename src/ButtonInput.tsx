import React from 'react'

type ButtonInputType = {
  addTaskTodo: () => void
}

export const ButtonInput = (props:ButtonInputType) => {
  return (
    <div>
            <button onClick={() => props.addTaskTodo()} >+</button>
    </div>
  )
}
