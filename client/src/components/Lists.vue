
<template>
  <div>
    <div class="lists"></div>
    <div v-for="list in lists" v-bind:key="list.id" v-on:click="sendToSingleList(list.id)">
      <p>
        <span>
          <b>{{ list.name }}</b>
        </span>
        <br>
      </p>
    </div>
  </div>
</template>

<script>
import ListService from "../../services/ListService.js";
export default {
  name: "lists",
  data() {
    return { lists: [] };
  },
  mounted() {
    this.getLists();
  },
  methods: {
    async getLists() {
      const response = await ListService.fetchLists();
      this.lists = response.data;
    },
    sendToSingleList(id) {
      this.$router.push({ path: `/lists/${id}` });
    }
  }
};
</script>