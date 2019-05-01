<template>
  <div class="card-edit">
    <b-card :header="list.name" header-tag="header">
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
      <b-button variant="danger" v-on:click="deleteList(list.id)">Destroy List</b-button>
    </b-card>
  </div>
</template>

<script>
import ListService from "../../services/ListService.js";
import TaskService from "../../services/TaskService.js";
export default {
  name: "one-list",
  props: ["id"],
  data() {
    return { list: {} };
  },
  mounted() {
    this.getOneList();
  },
  methods: {
    async getOneList() {
      let listId = null;
      // check if id is passed in as props or if it should be captured from the URL
      if (!this.$props.id) {
        listId = this.$route.params.id;
      } else {
        listId = this.$props.id;
      }
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
      await this.getOneList();
    },
    async deleteList(id) {
      await ListService.deleteList(id);
      // check to see if we need to re-route to homepage or if we are already on homepage
      if (this.$route.params.id) {
        this.$router.push({ path: `/lists` });
        // emit back to the parent element to reload the lists, since this one is now deleted
      } else {
        this.$emit("update");
      }
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
