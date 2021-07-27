import React, { useState } from 'react';
import { v1 } from 'uuid';
import { AllInput } from './AllInput';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilteredTasks = "all" | "active" | "completed"

export type TodolistsType =
    {
        id: string,
        title: string,
        filter: FilteredTasks
    }

type TaskStateType = {
    [key: string]: TaskType[]
}


function App() {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all' },
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
        [todolistID2]:[
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTodo = (todolistID: string) => {
        setTodolists(todolists.filter(td => td.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }


    const addTask = (todolistID: string, title: string) => {
        let newTask = { id: v1(), title, isDone: false }
        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks({...tasks})
    }

    const removeTask = (todolistID: string, id: string) => {
        if(tasks[todolistID]){
            tasks[todolistID] = tasks[todolistID].filter(t => t.id !== id)
        }
        setTasks({...tasks})
    }

    const filterTasks = (todolistID: string, value: FilteredTasks) => {
        const filteredTasks = todolists.map(t => {
            if(todolistID === t.id){
                let copy = {...t}
                copy.filter = value
                return copy
            }
            return t
        })
        setTodolists(filteredTasks)
    }

    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        let task = tasks[todolistID].find(t => t.id === taskId);
        if(task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    const addTodo = (title: string) => {
        let newTodoList: TodolistsType = {
            id: v1(),
            title,
            filter: 'all'
        }
        setTodolists([newTodoList, ...todolists])
        setTasks({
            ...tasks,
            [newTodoList.id]:[]
        })
    }


    return (
        <div className="App">
            <AllInput addItem={addTodo}/>
            {todolists.map(td => {

                let todoList = tasks[td.id];

                if (td.filter === "active") {
                    todoList = tasks[td.id].filter(t => !t.isDone);
                }
                if (td.filter === "completed") {
                    todoList = tasks[td.id].filter(t => t.isDone);
                }

                return (
                    <Todolist   title={td.title}
                                tasks={todoList}
                                addTask={addTask}
                                removeTask={removeTask}
                                filterTasks={filterTasks}
                                changeStatus={changeStatus}
                                filter={td.filter}
                                todolistID={td.id}
                                removeTodo={removeTodo}
                                todolists={todolists} />
                )
            })}
        </div>

    );
}

export default App;













// import React, { useState } from 'react';
// import { v1 } from 'uuid';
// import './App.css';
// import {TaskType, Todolist} from './Todolist';

// export type FilteredTasks = "all" | "active" | "completed"

// export type TodolistsType =
//     {
//         id: string,
//         title: string,
//         filter: FilteredTasks
//     }

// type TaskStateType = {
//     [key: string]: TaskType[]
// }


// function App() {

//     let todolistID1=v1();
//     let todolistID2=v1();

//     let [todolists, setTodolists] = useState<Array<TodolistsType>>([
//         {id: todolistID1, title: 'What to learn', filter: 'all' },
//         {id: todolistID2, title: 'What to buy', filter: 'all'}
//     ])

//     let [tasks, setTasks] = useState<TaskStateType>({
//         [todolistID1]:[
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "ReactJS", isDone: false},
//         {id: v1(), title: "Rest API", isDone: false},
//         {id: v1(), title: "GraphQL", isDone: false},
//     ],
//         [todolistID2]:[
//         {id: v1(), title: "HTML&CSS2", isDone: true},
//         {id: v1(), title: "JS2", isDone: true},
//         {id: v1(), title: "ReactJS2", isDone: false},
//         {id: v1(), title: "Rest API2", isDone: false},
//         {id: v1(), title: "GraphQL2", isDone: false},
//         ]
//     });

//     const removeTodo = (todolistID: string) => {
//         setTodolists(todolists.filter(td => td.id !== todolistID))
//         delete tasks[todolistID]
//         setTasks({...tasks})
//     }


//     const addTask = (todolistID: string, title: string) => {
//         let newTask = { id: v1(), title, isDone: false }
//         tasks[todolistID] = [newTask, ...tasks[todolistID]]
//         setTasks({...tasks})
//     }

//     const removeTask = (todolistID: string, id: string) => {
//         if(tasks[todolistID]){
//             tasks[todolistID] = tasks[todolistID].filter(t => t.id !== id)
//         }
//         setTasks({...tasks})
//     }

//     const filterTasks = (todolistID: string, value: FilteredTasks) => {
//         const filteredTasks = todolists.map(t => {
//             if(todolistID === t.id){
//                 let copy = {...t}
//                 copy.filter = value
//                 return copy
//             }
//             return t
//         })
//         setTodolists(filteredTasks)
//     }

//     const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
//         let task = tasks[todolistID].find(t => t.id === taskId);
//         if(task) {
//             task.isDone = isDone;
//             setTasks({...tasks});
//         }
//     }







//     return (
//         <div className="App">

//             {todolists.map(td => {

//                 let todoList = tasks[td.id];

//                 if (td.filter === "active") {
//                     todoList = tasks[td.id].filter(t => !t.isDone);
//                 }
//                 if (td.filter === "completed") {
//                     todoList = tasks[td.id].filter(t => t.isDone);
//                 }

//                 return (
//                     <Todolist   title={td.title}
//                                 tasks={todoList}
//                                 addTask={addTask}
//                                 removeTask={removeTask}
//                                 filterTasks={filterTasks}
//                                 changeStatus={changeStatus}
//                                 filter={td.filter}
//                                 todolistID={td.id}
//                                 removeTodo={removeTodo}
//                                 todolists={todolists} />
//                 )
//             })}
//         </div>

//     );
// }

// export default App;
