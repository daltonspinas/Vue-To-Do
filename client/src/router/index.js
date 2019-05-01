import Vue from "vue";
import Router from "vue-router";
import Lists from "@/components/Lists";
import OneList from "@/components/OneList";
import ListForm from "@/components/ListForm";
import EditForm from "@/components/EditForm";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/lists",
      name: "Lists",
      component: Lists,
    },
    {
      path: "/lists/:id",
      name: "OneList",
      component: OneList,
    },
    {
      path: "/new-list",
      name: "New List",
      component: ListForm,
    },
    {
      path: "/edit-list/:id",
      name: "edit list",
      component: EditForm,
    },
  ],
});
