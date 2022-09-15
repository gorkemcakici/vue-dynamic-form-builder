<template>
  <div>
    <label :for="field.id" class="form-label me-2">{{ field.name }}</label>
    <i
      data-bs-toggle="tooltip"
      data-bs-placement="right"
      data-bs-html="true"
      :title="field.description"
      class="bi bi-lightbulb"
    >
    </i>
    <Datepicker
      class="mb-2"
      locale="tr-TR"
      v-model="userData['cf_' + field.id]"
      :format="'dd/MM/yyyy'"
      :class="[
        (userData['cf_' + field.id] === null ||
          userData['cf_' + field.id] === '') &&
        feedback === true &&
        field.is_required === true
          ? 'border border-danger'
          : '',
      ]"
    ></Datepicker>
  </div>
</template>
<script setup>
import { watch, computed } from "vue";
import { useStore } from "vuex";
const props = defineProps({
  field: Object,
  userData: Object,
  feedback: Boolean,
});

const store = useStore();
const getFeedbacks = computed(() => store.getters.getFeedbacks);
watch(
  () => props.userData["cf_" + props.field.id],
  (newValue) => {
    if (
      getFeedbacks.value.indexOf(props.field.id) > -1 &&
      (newValue != null || newValue != "")
    ) {
      store.commit("setFilteredFeedbacks", props.field.id);
    }
  }
);
props.userData["cf_" + props.field.id] = new Date();
</script>
<style scoped></style>