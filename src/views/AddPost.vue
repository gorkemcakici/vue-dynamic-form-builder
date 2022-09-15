<template>
  <div class="p-5" v-if="!getLoading">
    <div class="d-flex justify-content-center align-items-center mb-5">
      <router-link to="/" class="btn btn-primary">Home</router-link>
    </div>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div
          :class="`col-md-${field.css_style}`"
          v-for="field in getFields"
          :key="field.id"
        >
          <div class="mb-3">
            <appTextbox
              v-if="field.input_type === 'textbox'"
              :field="field"
              :userData="userData"
              :feedback="feedback"
            />

            <appSmartDdl
              v-else-if="field.input_type === 'smart_ddl'"
              :field="field"
              :userData="userData"
              :feedback="feedback"
            />
            <appCheckbox
              v-else-if="field.input_type === 'checkbox'"
              :field="field"
              :userData="userData"
              :feedback="feedback"
            />
            <appCalendar
              v-else-if="field.input_type === 'calendar'"
              :field="field"
              :userData="userData"
              :feedback="feedback"
            />
            <appText
              v-else-if="field.input_type === 'text'"
              :field="field"
              :userData="userData"
              :feedback="feedback"
            />
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
  <appLoading v-else />
</template>

<script setup>
import axios from "axios";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Tooltip } from "bootstrap";
import router from "../router";

new Tooltip(document.body, {
  selector: "[data-bs-toggle='tooltip']",
});
const store = useStore();
const feedback = ref(false);

const userData = ref({});

const getFields = computed(() => store.getters.getFields);
const getLoading = computed(() => store.getters.getLoading);

const submitForm = async () => {
  await getFields.value.forEach((item) => {
    if (
      item.is_required === true &&
      (userData.value["cf_" + item.id] === null ||
        userData.value["cf_" + item.id] === "")
    ) {
      if (store.getters.getFeedbacks.indexOf(item.id) === -1) {
        store.commit("setFeedbacks", item.id);
      }
    }
  });
  if (store.getters.getFeedbacks.length > 0) {
    feedback.value = true;
  } else {
    axios
      .post("http://localhost:3000/blogs", userData.value)
      .then(() => router.push("/"));
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
