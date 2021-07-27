import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { AllInput } from './AllInput';
import { FilteredTasks, TodolistsType } from './App';
import { Button } from './Button';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (todolistID: string, title: string) => void
    removeTask: (todolistID: string, id: string) => void
    filterTasks: (todolistID: string, value: FilteredTasks) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilteredTasks
    todolistID: string
    removeTodo: (todolistID: string) => void
    todolists: TodolistsType[]
}

export function Todolist (props: PropsType) {


    const onOriginHandler = (value: FilteredTasks) => {
        props.filterTasks(props.todolistID, value)
    }

    const addTask = (title: string) => {
        props.addTask( props.todolistID, title)
    }



    return <div>
        <div className="todo_title">
            <div className="title_wrapper">
                <h3 className="title">{props.title}</h3>
            </div>
            <Button removeTodo={props.removeTodo} todolistID={props.todolistID}/>
        </div>
        <div>
            <AllInput addItem={addTask}/>
        </div>
            <ul className="list">
                {props.tasks.map(t => {
                    return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input  type="checkbox"
                                        onChange={(e) => props.changeStatus(props.todolistID, t.id, e.currentTarget.checked)}
                                        checked={t.isDone}/>

                                <span>{t.title}</span>
                                <button onClick={() => props.removeTask(props.todolistID, t.id)}>x</button>
                            </li>
                    )
                })}
            </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={() => onOriginHandler("all")}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={() => onOriginHandler("active")}>Active</button>
            <button className={props.filter === "completed" ? "active-filter" : ""} onClick={() => onOriginHandler("completed")}>Completed</button>
        </div>
    </div>
}








// import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
// import { FilteredTasks, TodolistsType } from './App';
// import { Button } from './Button';
// import { ButtonInput } from './ButtonInput';
// import { Input } from './Input';

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

// type PropsType = {
//     title: string
//     tasks: Array<TaskType>
//     addTask: (todolistID: string, title: string) => void
//     removeTask: (todolistID: string, id: string) => void
//     filterTasks: (todolistID: string, value: FilteredTasks) => void
//     changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
//     filter: FilteredTasks
//     todolistID: string
//     removeTodo: (todolistID: string) => void
//     todolists: TodolistsType[]
// }

// export function Todolist (props: PropsType) {

//     let [title, setTitle] = useState("")
//     let [error, setError] = useState<string | null>(null)



//     const addTaskTodo = () => {
//         setError(null)
//         if(title.trim() !== ""){
//             props.addTask(props.todolistID, title.trim())
//             setTitle("")
//         } else {
//             setError("Title is required")
//         }
//     }

//     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         setError(null)
//         setTitle(e.currentTarget.value)
//     }

//     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//         setError(null)

//         if(e.key === "Enter"){
//             addTaskTodo()
//         }
//     }

//     const TsarHandler = (value: FilteredTasks) => {
//         props.filterTasks(props.todolistID, value)
//     }


//     return <div>
//         <h3>{props.title}
//             <Button removeTodo={props.removeTodo} todolistID={props.todolistID}/>
//         </h3>
//         <div>
//             <Input onChangeHandler={onChangeHandler} onKeyPressHandler={onKeyPressHandler} setError={setError}  setTitle={setTitle}  title={title} error={error} />
//             <ButtonInput addTaskTodo={addTaskTodo} />
//             {error && <div className="error-message">{error}</div>}
//         </div>
//             <ul className="list">
//                 {props.tasks.map(t => {
//                     return (
//                             <li key={t.id} className={t.isDone ? "is-done" : ""}>
//                                 <input  type="checkbox"
//                                         onChange={(e) => props.changeStatus(props.todolistID, t.id, e.currentTarget.checked)}
//                                         checked={t.isDone}/>

//                                 <span>{t.title}</span>
//                                 <button onClick={() => props.removeTask(props.todolistID, t.id)}>x</button>
//                             </li>
//                     )
//                 })}
//             </ul>
//         <div>
//             <button className={props.filter === "all" ? "active-filter" : ""} onClick={() => TsarHandler("all")}>All</button>
//             <button className={props.filter === "active" ? "active-filter" : ""} onClick={() => TsarHandler("active")}>Active</button>
//             <button className={props.filter === "completed" ? "active-filter" : ""} onClick={() => TsarHandler("completed")}>Completed</button>
//         </div>
//     </div>
// }
