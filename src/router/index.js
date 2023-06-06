import { createRouter, createWebHistory } from "vue-router";

import EmployeeList from "../views/employee/EmployeeList.vue";
import DashBoard from "../views/dashboard/DashBoard.vue";

const routes = [
  {
    path: "/",
    component:EmployeeList,
  },
  {
    path: "/dashboard",
    component: DashBoard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
