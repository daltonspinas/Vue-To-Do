
<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group label="To-Do List Name">
        <b-form-input v-model="form.listName" required placeholder="To-Do list name"></b-form-input>
      </b-form-group>

      <b-form-group label="Tasks">
        <b-form-input
          v-for="(task, idx) in form.tasks"
          v-bind:key="idx"
          v-model="form.tasks[idx]"
          required
          placeholder="Task"
        ></b-form-input>
      </b-form-group>

      <b-button v-on:click="addNewTask" variant="primary">Add Task</b-button>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import ListService from "../../services/ListService.js";
import TaskService from "../../services/TaskService.js";
export default {
  data() {
    return {
      form: {
        listName: "",
        tasks: []
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.makeNewList(this.form.listName);
    },
    addNewTask() {
      this.form.tasks.push(null);
    },
    async makeNewList(name) {
      const response = await ListService.createList(name);
      const listId = response.data.id;
      await this.makeNewTasks(listId);
    },
    makeNewTasks(listId) {
      this.form.tasks.forEach(async task => {
        const taskObj = {};
        taskObj.name = task;
        taskObj.listId = Number(listId);
        await TaskService.createTask(taskObj);
      });
    }
  }
};
</script>