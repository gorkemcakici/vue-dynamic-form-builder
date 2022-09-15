<template>
  <div class="p-5" v-if="!getLoading">
    <div class="d-flex justify-content-center align-items-center mb-5">
      <router-link to="/new-post" class="btn btn-primary"
        >Add New Post</router-link
      >
    </div>
    <div v-if="getBlogs.length > 0" class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="blog in getBlogs" :key="blog.id">
        <div class="card h-100">
          <div class="card-body d-flex justify-content-between">
            <div>
              <h5 class="card-title">{{ blog[fields[0]] }}</h5>
              <h6>{{ blog[fields[1]] }}</h6>
              <p class="card-text">
                {{ blog[fields[4]] }}
              </p>
            </div>
            <div>
              <input type="checkbox" :checked="blog[fields[2]]" disabled />
            </div>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <small class="text-muted">{{
              moment(blog[fields[3]]).format("ll")
            }}</small>
            <div class="d-flex gap-3">
              <router-link :to="`/${blog.id}`" class="text-decoration-none"
                ><i class="bi bi-pencil-square"></i
              ></router-link>
              <i class="bi bi-trash" @click="deletePost(blog.id)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center">
      Henüz Post Yok.
    </div>
  </div>
  <appLoading v-else />
</template>

<script setup>
import axios from "axios";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import moment from "moment";
const store = useStore();
const fields = ref([]);
store.commit("setLoading", true);
onMounted(() => {
  axios
    .get("http://localhost:3000/blogs")
    .then((response) => {
      store.commit("setBlogs", response.data);
      getFields.value.forEach((item) => {
        fields.value.push("cf_" + item.id);
      });
    })
    .catch((e) => console.log(e))
    .finally(() => store.commit("setLoading", false));
});

const getBlogs = computed(() => store.getters.getBlogs);
const getFields = computed(() => store.getters.getFields);
const getLoading = computed(() => store.getters.getLoading);

const deletePost = (id) => {
  axios.delete("http://localhost:3000/blogs/" + id).then(() => {
    const blogs = getBlogs.value.filter((blog) => blog.id != id);

    store.commit("setBlogs", blogs);
  });
};
</script>

<style scoped>
input[type="checkbox"] {
  width: 30px;
  height: 30px;
}
.bi-trash {
  cursor: pointer;
}
</style>