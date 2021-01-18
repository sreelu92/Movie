import Vue from "vue";
import VueRouter from "vue-router";
import SearchPage from "../views/SearchMovies.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "search-page",
    component:SearchPage
  },
  
];

const router = new VueRouter({
  routes
});

export default router;
