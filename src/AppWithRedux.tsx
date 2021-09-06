import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import { AddItemForms } from './AddItemForms';
import { AppBar, IconButton, Toolbar, Typography, Button, Container, Grid, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>( state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }


    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, title, todolistId))
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatch(action)
    }

    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }


    function changeTodoTitle(id: string, title: string) {
        dispatch(changeTodolistTitleAC(id, title))
    }


    const callBackHandler = React.useCallback((title: string) => {
        addTodoList(title)
    }, []);


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" >
                    News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                </AppBar>
            <Grid container style={{padding: "20px"}}>
                <Container fixed>
                    <AddItemForms callBack={callBackHandler}/>
                </Container>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === "active") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                        }

                        return <Grid item>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoTitle={changeTodoTitle}
                                        />
                                    </Paper>
                                </Grid>
                    })
                }
            </Grid>

        </div>
    );
}

export default AppWithRedux;
