import React, { useState } from "react";
import "./TodoApp.css";
import { nanoid } from "nanoid";

export default function TodoApp() {
  const [todoListData, setTodoListData] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let taskData = {
      task_id: nanoid(),
      task_name: formData.get("task_name"),
      isCompleted: false,
    };

    setTodoListData((prevTodoListData) => {
      const newTodoListData = [...prevTodoListData, taskData];
      console.log(newTodoListData, "New Todo List Data");
      return newTodoListData;
    });
  };

  const onComplete = (index) => {
    const updatedTodoList = [...todoListData];

    updatedTodoList[index] = {
        ...updatedTodoList[index],
        isCompleted: true
    };
    setTodoListData(() => {
        console.log(updatedTodoList,"updatedTodoList",todoListData)
        return updatedTodoList});
  }

  const onDelete = (index) => {
    const updatedTodoList = [...todoListData];
    updatedTodoList.pop(index);
    setTodoListData(updatedTodoList);
  }

  return (
    <div className="container TodoApp">
      <div className="row  d-flex justify-content-center align-items-center">
        <div className="col-6 ">
          <div class="card">
            <div className="card-header custom-text-color">Simple Todo App</div>
            <div class="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="">
                      Task Name
                    </span>
                  </div>
                  <input type="text" class="form-control" name="task_name" />
                  <button type="submit" class="btn btn-outline-warning ml-2">
                    Submit
                  </button>
                </div>
              </form>

              {todoListData.length > 0 &&
                todoListData.map((item,index) => {
                  return (
                    <div
                      className="d-flex align-items-center justify-content-center mt-3 border border-secondary"
                      key={item.task_id}
                    >
                      <div className="p-2">
                        <span className={item.isCompleted && "is-completed" || ""}>{item.task_name}</span> 
                      </div>
                      <div className="p-2">
                        <button type="button" class="btn btn-outline-success" onClick={()=>onComplete(index)} disabled={item.isCompleted}>
                          Complete
                        </button>
                      </div>
                      <div className="p-2">
                        <button type="button" class="btn btn-outline-danger" onClick={()=> onDelete(index)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
