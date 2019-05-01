import Api from "./Api";

export default {
  fetchLists() {
    return Api().get("lists");
  },
  fetchOneList(id) {
    return Api().get(`lists/${id}`);
  },
  createList(name) {
    const listBody = { name };
    return Api().post(`lists`, listBody);
  },
  deleteList(id) {
    return Api().delete(`lists/${id}`);
  },
};
