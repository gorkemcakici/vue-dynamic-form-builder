import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
  },
  {
    path: "/new-post",
    name: "AddPost",
    component: () =>
      import(/* webpackChunkName: "AddPost" */ "../views/AddPost.vue"),
  },
  {
    path: "/:id",
    name: "PostDetail",
    component: () =>
      import(/* webpackChunkName: "PostDetail" */ "../views/PostDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
