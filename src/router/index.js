import { createRouter, createWebHistory } from "vue-router";

import EmployeeList from "../views/employee/EmployeeList.vue";
import CategoryList from "../views/category/CategoryList.vue";
import AccountList from '../views/account/AccountList.vue';
const routes = [
  {
    path: "/employee",
    component:EmployeeList,
  },
  {
    path:"/category",
    component:CategoryList
  },{
    path:"/account",
    component:AccountList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
