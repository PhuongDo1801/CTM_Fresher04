<template>
   <div class="container__right-main">
          <EmployeeList/>
        </div>
</template>
  
  <script>
  import EmployeeList from '@/views/employee/EmployeeList.vue';
  export default {
    name: 'TheMain',
    components: {
      EmployeeList
    }
  }
  </script>
  
  <style>
  
  </style>
  