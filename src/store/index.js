import { createStore } from "vuex";

export default createStore({
  state: {
    fields: [],
    blogs: [],
    loading: false,
    feedbacks: [],
  },
  getters: {
    getFields: (state) => state.fields,
    getBlogs: (state) => state.blogs,
    getLoading: (state) => state.loading,
    getFeedbacks: (state) => state.feedbacks,
  },
  mutations: {
    setBlogs(state, payload) {
      state.blogs = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setFields(state, payload) {
      state.fields = payload;
    },
    setFeedbacks(state, payload) {
      state.feedbacks.push(payload);
    },
    setFilteredFeedbacks(state, payload) {
      state.feedbacks = state.feedbacks.filter((item) => item != payload);
    },
  },
  actions: {},
});
