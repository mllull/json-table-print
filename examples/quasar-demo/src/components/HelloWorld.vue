<script setup lang="ts">
import { ref } from "vue";
import { printTable } from "@mllull/json-table-print";
// import { printTable } from "./index";

const count = ref(0);

defineProps<{ msg: string }>();

const displayAlert = async () => {
  printTable(
    {
      headers: {
        id: "ID",
        firstName: "First Name",
        lastName: "Last Name",
      },
      pageTitle: "Json Table Print",
      // pageTitleClass: "text-4xl text-center text-red-500 mb-4",
      pageTitleClass: "h2 text-center mb-4",

      tableClass: "table table-striped text-center mt-4",
      // theadClass: "bg-white border-b",
      // thClass: "px-6 py-4 text-left text-xl font-medium text-gray-900",
      linkCSSLib:
        "https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css",
    },
    [
      {
        id: "1",
        firstName: "llull",
        lastName: "Cruise",
      },
      {
        id: "2",
        firstName: "Maria",
        lastName: "Sharapova",
      },
      {
        id: "3",
        firstName: "James",
        lastName: "Bond",
      },
    ]
  );
};
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="displayAlert">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
