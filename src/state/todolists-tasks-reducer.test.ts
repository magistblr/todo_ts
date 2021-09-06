import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import { FilterValuesType, TasksStateType, TodolistType } from '../AppWithRedux';
import { tasksReducer } from './tasks-reducer';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistType> = [];

  const action = addTodolistAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.id);
  expect(idFromTodolists).toBe(action.id);
});
