import React, { Component } from "react";
import { callApi } from "../authConfig";

class PageLayout extends Component {
    state = {
        selectedList: "",
        selectedTask: "",
        taskItems: [],
        taskData: { body: { content: "" }, status: "" },
        displayTask: "col list-group invisible",
        displayTaskDetails: "col invisible",
        newListName: "",
        newTaskName: "",
        listFound: "",
    };

    handleTodoList = async (listId) => {
        const { value } = await callApi(
            localStorage.getItem("token"),
            `${listId}/tasks`
        );
        this.setState({
            selectedList: listId,
            selectedTask: "",
            newTaskName: "",
            taskItems: value,
            displayTask: "col list-group visible",
            displayTaskDetails: "col invisible",
        });
    };

    handleTodoTask = (todoTask) => {
        this.setState({
            selectedTask: todoTask.id,
            taskData: todoTask,
            displayTaskDetails: "col visible",
        });
    };

    handleChange = (event) => {
        if (event.target.parentElement.parentElement.id === "todoList")
            this.setState({ newListName: event.target.value });
        else this.setState({ newTaskName: event.target.value });
    };

    addItem = async (event) => {
        event.preventDefault();

        const { newListName, newTaskName, selectedList } = this.state;
        let name, data, endPoint;
        if (event.target.parentElement.id === "todoList") {
            name = newListName;
            data = { displayName: name };
            endPoint = "";
        } else {
            name = newTaskName;
            data = { title: name };
            endPoint = `${selectedList}/tasks`;
        }

        const token = localStorage.getItem("token");
        await callApi(token, endPoint, "POST", data).catch((ex) =>
            console.log("post", ex)
        );

        this.setState({
            newListName: "",
            newTaskName: "",
            selectedList: "",
            selectedTask: "",
            displayTask: "col list-group invisible",
            displayTaskDetails: "col invisible",
        });
        event.target.parentElement.id === "todoList"
            ? this.props.onUpdate()
            : this.handleTodoList(selectedList);
    };

    deleteItem = async (event) => {
        const { selectedList, selectedTask } = this.state;

        const endPoint =
            event.target.parentElement.id === "todoList"
                ? selectedList
                : `${selectedList}/tasks/${selectedTask}`;

        const token = localStorage.getItem("token");
        await callApi(token, endPoint, "DELETE").catch((ex) =>
            console.log("del", ex)
        );

        this.setState({
            newListName: "",
            newTaskName: "",
            selectedTask: "",
            displayTask: "col list-group invisible",
            displayTaskDetails: "col invisible",
        });
        event.target.parentElement.id === "todoList"
            ? this.props.onUpdate()
            : this.handleTodoList(selectedList);
    };

    taskHandler(id) {
        const { selectedList, selectedTask, newListName, newTaskName } =
            this.state;

        const activeItem = id === "todoList" ? selectedList : selectedTask;
        const name = id === "todoList" ? newListName : newTaskName;

        return (
            <div
                className="list-group-item d-flex justify-content-center align-items-center p-3"
                id={id}>
                <form onSubmit={this.addItem} className="d-flex">
                    <input
                        type="text"
                        style={{
                            height: "2rem",
                            marginRight: "1rem",
                        }}
                        onChange={this.handleChange}
                        value={name}
                        required
                    />
                    <button
                        className="btn btn-primary mx-2 lh-sm"
                        type="submit">
                        Add
                    </button>
                </form>
                <button
                    className={`btn btn-danger lh-sm ${
                        activeItem ? "" : "disabled"
                    }`}
                    onClick={this.deleteItem}>
                    Delete
                </button>
            </div>
        );
    }

    render() {
        const { data } = this.props;
        const {
            selectedList,
            taskItems,
            selectedTask,
            taskData,
            displayTask,
            displayTaskDetails,
        } = this.state;

        return (
            <React.Fragment>
                <div className="row mx-auto my-3">
                    <div className="col list-group">
                        <button className="list-group-item disabled fs-5 fw-bold text-black bg-light">
                            Todo List
                        </button>
                        {data.map((todoList) => (
                            <button
                                key={todoList.id}
                                className={
                                    todoList.id === selectedList
                                        ? "list-group-item active"
                                        : "list-group-item"
                                }
                                onClick={() =>
                                    this.handleTodoList(todoList.id)
                                }>
                                {todoList.displayName}
                            </button>
                        ))}
                        {this.taskHandler("todoList")}
                    </div>
                    <div className={displayTask}>
                        {taskItems.length ? (
                            <>
                                <button className="list-group-item disabled fs-5 fw-bold text-black bg-light">
                                    Todo Task
                                </button>
                                {taskItems.map((todoTask) => (
                                    <button
                                        key={todoTask.id}
                                        className={
                                            todoTask.id === selectedTask
                                                ? "list-group-item active"
                                                : "list-group-item"
                                        }
                                        onClick={() =>
                                            this.handleTodoTask(todoTask)
                                        }>
                                        {todoTask.title}
                                    </button>
                                ))}
                            </>
                        ) : (
                            <h5>Empty</h5>
                        )}
                        {this.taskHandler("todoTask")}
                    </div>
                    <div className={displayTaskDetails}>
                        <div className="bg-light p-2">
                            <h5 className="fw-bold">Details</h5>
                            Note: {taskData.body.content}
                            <div>{"Importance - " + taskData.importance}</div>
                            <div>
                                Reminder -{" "}
                                {taskData.isReminderOn
                                    ? "On [Date: " +
                                      taskData.reminderDateTime.dateTime.substring(
                                          0,
                                          10
                                      ) +
                                      ", Time: " +
                                      taskData.reminderDateTime.dateTime.substring(
                                          11,
                                          16
                                      ) +
                                      " UTC]"
                                    : "Off"}
                            </div>
                            <div className="fw-bold">
                                {"Status - " + taskData.status.toUpperCase()}
                            </div>
                            <a
                                className="btn btn-secondary btn-sm"
                                target="_blank"
                                rel=" noreferrer noopener"
                                href={
                                    "https://to-do.live.com/tasks/id/" +
                                    selectedTask +
                                    "/details"
                                }>
                                Edit
                            </a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PageLayout;
