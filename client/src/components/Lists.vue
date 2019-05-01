
<template>
  <div>
    <div class="lists"></div>
    <b-card-group deck>
      <div v-for="list in lists" v-bind:key="list.id">
        <singleList :id="list.id"></singleList>
      </div>
    </b-card-group>
  </div>
</template>

<script>
import ListService from "../../services/ListService.js";
import OneList from "./OneList";
import { EventBus } from "../eventbus.js";
export default {
  name: "lists",
  components: { singleList: OneList },
  data() {
    return { lists: [] };
  },
  mounted() {
    this.getLists();
    EventBus.$on("update", () => {
      this.getLists();
    });
  },
  methods: {
    async getLists() {
      const response = await ListService.fetchLists();
      this.lists = response.data;
    }
  }
};
</script>

<style scoped>
b-card-group {
  margin: 0 auto;
}
</style>
