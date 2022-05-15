import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addTaskApiAction,
  deleteTask,
  doneTask,
  getAllTaskAction,
  rejectTaskAction,
} from "../../redux/action/toDoListAction";

export default function ToDoList() {
  const [task, setTask] = useState({ taskName: "", status: false });
  const { arrTask } = useSelector((rootReducer) => {
    return rootReducer.toDoListReducer;
  });
  const disPatch = useDispatch();
  useEffect(() => {
    const action = getAllTaskAction();
    disPatch(action);
  }, []);
  const handleChangeInput = (e) => {
    let { value, name } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    // e.preventDefault();
    const action = addTaskApiAction(task);
    disPatch(action);
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <h3>To do list</h3>
          <form className="input-group mb-3" onSubmit={handleSubmit}>
            <input
              type="text"
              name="taskName"
              className="form-control"
              placeholder="task name"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={handleChangeInput}
            />
            <div className="input-group-append">
              <button
                type="submit"
                className="input-group-button btn btn-success"
                id="basic-addon2"
              >
                Add task
              </button>
            </div>
          </form>

          <table className="table">
            <tbody>
              {arrTask
                .filter(
                  (task) => task.status === false && task.taskName.trim() !== ""
                )
                .map((task, index) => {
                  return (
                    <tr key={index}>
                      <td>{task.taskName}</td>
                      <td>
                        <span className="badge badge-danger">incompleted</span>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            console.log(task.taskName);
                            const action = doneTask(task.taskName);
                            disPatch(action);
                          }}
                          className="btn btn-success"
                        >
                          done
                        </button>
                        <button
                          onClick={() => {
                            const action = deleteTask(task.taskName);
                            disPatch(action);
                          }}
                          className="btn btn-danger ml-2"
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>

            <tfoot>
              {arrTask
                .filter(
                  (task) => task.status === true && task.taskName.trim() !== ""
                )
                .map((task, index) => {
                  return (
                    <tr key={index}>
                      <td>{task.taskName}</td>
                      <td>
                        <span className="badge badge-success">completed</span>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            const action = rejectTaskAction(task.taskName);
                            disPatch(action);
                          }}
                          className="btn btn-warning"
                        >
                          undo
                        </button>
                        <button
                          onClick={() => {
                            const action = deleteTask(task.taskName);
                            disPatch(action);
                          }}
                          className="btn btn-danger ml-2"
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
