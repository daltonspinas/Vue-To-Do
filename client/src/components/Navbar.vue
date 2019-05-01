<template>
  <div class="navbar">
    <div fixed="top">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Vue To-Do App</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link class="nav-selection" to="/lists">Home</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link class="nav-selection" to="/new-list">Create New List</router-link>
            </b-nav-item>
            <b-nav-item-dropdown class="nav-selection" text="My Lists" right>
              <b-dropdown-item
                v-for="list in lists"
                v-bind:key="list.id"
                v-on:click="sendToSingleList(list.id)"
              >{{list.name}}</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import ListService from "../../services/ListService.js";
export default {
  name: "navbar",
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

<style scoped>
.nav-selection {
  color: aliceblue;
}
</style>
