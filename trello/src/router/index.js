import { createRouter, createWebHistory } from "vue-router";
import Board from "../views/Board.vue";

const routes = [
  {
    path: "/",
    name: "Board",
    component: Board,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Board
    },
  ]
})

export default router;
