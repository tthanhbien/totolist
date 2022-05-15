import axios from "axios";

export const getAllTaskAction = () => {
  return async (disPatch, getState) => {
    try {
      let result = await axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET",
      });
      const action = {
        type: "GET_ALL_TASK",
        arrTask: result.data,
      };
      disPatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const addTaskApiAction = (task) => {
  return (dispatch) => {
    let result = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: task,
    });
    const action = getAllTaskAction();
    dispatch(action);
  };
};

export const doneTask = (taskName) => {
  return async (disPatch) => {
    try {
      let result = await axios({
        url:
          "http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=" + taskName,
        method: "PUT",
      });
      disPatch(getAllTaskAction());
    } catch (err) {
      console.log(err);
    }
  };
};

export const rejectTaskAction = (taskName) => {
  return async (disPatch) => {
    try {
      let result = await axios({
        url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
        method: "PUT",
      });
      disPatch(getAllTaskAction());
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteTask = (taskName) => {
  return (disPatch) => {
    let result = axios({
      url:
        "http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=" + taskName,
      method: "DELETE",
    });
    disPatch(getAllTaskAction());
  };
};
