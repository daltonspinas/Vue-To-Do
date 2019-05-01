<template>
  <div class="card-edit">
    <b-card :header="list.name" header-tag="header" footer="Card Footer" footer-tag="footer">
      <b-card-text>
        <ul>
          <li v-for="task in list.tasks" v-bind:key="task.id">
            <span v-bind:class="{ complete: task.completed }">{{task.name}}</span>
            <b-button
              class="checked-task"
              variant="success"
              v-on:click="switchComplete(task)"
            >&#10003;</b-button>
            <b-button class="kill-task" variant="danger" v-on:click="deleteTask(task.id)">X</b-button>
          </li>
        </ul>
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
</template>

<script>
import ListService from "../../services/ListService.js";
import TaskService from "../../services/TaskService.js";
export default {
  name: "one-list",
  data() {
    return { list: {} };
  },
  mounted() {
    this.getOneList();
  },
  methods: {
    async getOneList() {
      const listId = this.$route.params.id;
      const response = await ListService.fetchOneList(listId);
      // sort the list of tasks based on id. Could not get Sequelize to achieve this in the context of eager loading
      response.data.tasks.sort((a, b) => {
        return a.id - b.id;
      });
      this.list = response.data;
    },
    async editTask(taskObj) {
      const response = await TaskService.updateTask(taskObj);
      this.getOneList();
    },
    switchComplete(taskObj) {
      taskObj.completed = !taskObj.completed;
      this.editTask(taskObj);
    },
    async deleteTask(id) {
      await TaskService.deleteTask(id);
      this.getOneList();
    }
  },
  watch: {
    $route: function(to, from) {
      this.getOneList();
    }
  }
};
</script>

<style scoped>
.card-edit {
  width: 50vw;
  margin: 0 auto;
}

li {
  list-style: none;
}

.kill-task {
  margin: 0, 10px, 0, auto;
}

.complete {
  text-decoration: line-through;
}
</style>
