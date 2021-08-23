import { v1 } from "uuid";
import { FilterValuesType, TasksStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2 } from "./todolists-reducer";

export type RemoveTasktActionType = {
  type: 'REMOVE-TASK',
  id: string
  todolistId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK'
  title: string
  todolistId: string
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  id: string
  title: string
  todolistId: string
}

export type ChangeTasksFilterActionType = {
  type: 'CHANGE-TASK-FILTER'
  id: string
  filter: FilterValuesType
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  id: string
  isDone: boolean
  todolistId: string
}

export type ActionTypes =   RemoveTasktActionType |
                            AddTaskActionType |
                            ChangeTaskTitleActionType |
                            ChangeTasksFilterActionType |
                            ChangeTaskStatusActionType |
                            AddTodolistActionType |
                            RemoveTodolistActionType

const initialState: TasksStateType = {
  [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
  ],
  [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
  ]
}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {
  switch (action.type) {
      case 'REMOVE-TASK':
          return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.id)}
      case 'ADD-TASK':
          return {...state, [action.todolistId]: [...state[action.todolistId], {id: v1(), title: action.title, isDone: false}]}
      case 'CHANGE-TASK-TITLE':
          return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {...t, title: action.title} : t)}
      case 'CHANGE-TASK-STATUS':
          return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {...t, isDone: action.isDone} : t)}
      case 'ADD-TODOLIST':
          return {...state, [action.id]:[]}
      case 'REMOVE-TODOLIST': {
          const copyState = {...state }
          delete copyState[action.id]
          return copyState
          }
      default:
          return state
          }
}


export const removeTaskAC = (id: string, todolistId: string): RemoveTasktActionType => {
  return { type: 'REMOVE-TASK', id: id, todolistId: todolistId}
}

export const addTaskAC = ( title: string, todolistId: string): AddTaskActionType => {
  return { type: 'ADD-TASK', title, todolistId}
}

export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', id: id, title, todolistId}
}

export const changeTaskFilterAC = (id: string, filter: FilterValuesType): ChangeTasksFilterActionType => {
  return { type: 'CHANGE-TASK-FILTER', id, filter}
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', id, isDone, todolistId}
}
