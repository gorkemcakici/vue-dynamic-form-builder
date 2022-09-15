<template>
  <router-view />
</template>

<script setup>
import axios from "axios";
import { useStore } from "vuex";
import { onMounted } from "vue";
const store = useStore();
store.commit("setLoading", true);
onMounted(() => {
  axios
    .get("http://localhost:3000/fields")
    .then((response) => {
      store.commit("setFields", response.data);
    })
    .catch((e) => console.log(e))
    .finally(() => store.commit("setLoading", false));
});
</script>

<style scoped></style>