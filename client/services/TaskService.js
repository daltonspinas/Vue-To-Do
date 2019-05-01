import Api from "./Api";

export default {
  createTask(taskObj) {
    return Api().post(`tasks`, taskObj);
  },
  updateTask(taskObj) {
    return Api().put(`tasks`, taskObj);
  },
  deleteTask(id) {
    return Api().delete(`tasks/${id}`);
  },
};
