import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST',
  id: string
}

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  id: string
}

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string
  filter: FilterValuesType
}

export type ActionTypes =   RemoveTodolistActionType |
                            AddTodolistActionType |
                            ChangeTodolistTitleActionType |
                            ChangeTodolistFilterActionType

  export const todolistId1 = v1();
  export const todolistId2 = v1();

  const initialState: Array<TodolistType> = [
      {id: todolistId1, title: "What to learn", filter: "all"},
      {id: todolistId2, title: "What to buy", filter: "all"}
  ]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionTypes): Array<TodolistType> => {
  switch (action.type) {
      case 'REMOVE-TODOLIST':
          return [...state.filter(tl => tl.id != action.id)]
      case 'ADD-TODOLIST':
          return [...state, {id: action.id, title: action.title, filter: "all"}]
      case 'CHANGE-TODOLIST-TITLE':
          return state.map(td => td.id === action.id ? {...td, title: action.title} : td)
      case 'CHANGE-TODOLIST-FILTER':
          return state.map(td => td.id === action.id ? {...td, filter: action.filter} : td)
      default:
          return state
  }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = ( title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title,  id: v1()}
}

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title}
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}
