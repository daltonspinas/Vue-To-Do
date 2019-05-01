<template>
  <div class="form-item">
    <b-form @submit="onSubmit">
      <b-form-group label="To-Do List Name">
        <b-form-input v-model="list.name" required v-bind:placeholder="list.name"></b-form-input>
      </b-form-group>

      <b-form-group label="Tasks">
        <b-form-input
          v-model="list.tasks[idx].name"
          required
          v-bind:placeholder="task.name"
          v-for="(task, idx) in list.tasks"
          v-bind:key="idx"
        ></b-form-input>
        <b-form-input
          v-for="(task, idx) in newTasks"
          v-bind:key="idx"
          v-model="newTasks[idx]"
          required
          placeholder="new task name"
        ></b-form-input>
      </b-form-group>
      <b-button v-on:click="addNewTask" variant="secondary">Add Task</b-button>
      <b-button type="submit" variant="primary">Submit Edit</b-button>
    </b-form>
  </div>
</template>

<script>
import ListService from "../../services/ListService.js";
import TaskService from "../../services/TaskService.js";
export default {
  data() {
    return {
      list: {},
      newTasks: []
    };
  },
  mounted() {
    this.getOneList();
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      // update the lists name
      await this.editListName(this.list);
      // go thru each existing task and update it
      this.list.tasks.forEach(async task => {
        await this.editTask(task);
      });
      // go thru the added tasks and create them
      await this.makeNewTasks(this.list.id);
      // unable to track down the 500 error that occurs when the user is sent back to the list view
      // only happens when this function is called, not when the user navigates to list view any other way
      this.sendToLists();
    },
    addNewTask() {
      this.newTasks.push(null);
    },
    async editTask(taskObj) {
      const response = await TaskService.updateTask(taskObj);
      this.getOneList();
    },
    async getOneList() {
      const listId = this.$route.params.id;
      const response = await ListService.fetchOneList(listId);
      // sort the list of tasks based on id. Could not get Sequelize to achieve this in the context of eager loading
      response.data.tasks.sort((a, b) => {
        return a.id - b.id;
      });
      this.list = response.data;
    },
    makeNewTasks(listId) {
      // procedurally set the foreign keys and create the tasks
      this.newTasks.forEach(async task => {
        const taskObj = {};
        taskObj.name = task;
        taskObj.listId = Number(listId);
        await TaskService.createTask(taskObj);
      });
    },
    async editListName(list) {
      await ListService.editList(list);
    },
    sendToLists() {
      this.$router.push({ path: `/lists` });
    }
  }
};
</script>

<style scoped>
.form-item {
  width: 50%;
  margin: 0 auto;
}
</style>
