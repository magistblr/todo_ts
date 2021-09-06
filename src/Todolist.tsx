import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, {ChangeEvent} from 'react';
import { AddItemForms } from './AddItemForms';
import {FilterValuesType} from './AppWithRedux';
import { EditableSpan } from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTodoTitle: (id: string, title: string, todolistId: string) => void
}

export const Task = React.memo( (props: TaskPropsType) => {

    const onClickHandler = React.useCallback(() => props.removeTask(props.task.id, props.id), [props.removeTask, props.task.id, props.id])

    const onChangeTaskHandler = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.id);
    }, [props.changeTaskStatus, props.task.id, props.id])

    const onChangeTitleHandler = React.useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.id);
    }, [props.changeTaskTitle, props.task.id, props.id])

    return (
            <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
                <Checkbox color="primary" onChange={onChangeTaskHandler} checked={props.task.isDone}/>
                <EditableSpan title={props.task.title} callback={onChangeTitleHandler}/>
                <IconButton onClick={onClickHandler}>
                    <Delete/>
                </IconButton>
            </div>
            )
})


export const Todolist = React.memo(function(props: PropsType) {
    console.log("Todolist called")

    const removeTodolist = () => props.removeTodolist(props.id)


    const onAllClickHandler = React.useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = React.useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = React.useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    const onChangeTitleTodoHandler = React.useCallback((newValue: string) => {
        props.changeTodoTitle(props.id, newValue, props.id);
    }, [props.changeTodoTitle, props.id]);

    const callBackHandler = React.useCallback((title: string) => {
            props.addTask(title, props.id)
    }, [props.addTask, props.id]);

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }


    return <div>
        <h3> <EditableSpan title={props.title} callback={onChangeTitleTodoHandler}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <div>
            <AddItemForms callBack={callBackHandler}/>
        </div>
        <div>
            {
                props.tasks.map(t =>
                    <Task
                            task ={t}
                            removeTask={props.removeTask}
                            changeFilter={props.changeFilter}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            id={props.id}
                            key={t.id}
                            />
                )
            }
        </div>
        <div>
            <Button color='default' variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color="primary" variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color="secondary" variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})


type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    task: TaskType
    id: string
}

