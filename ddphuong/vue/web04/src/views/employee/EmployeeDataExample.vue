<template>
    <tr>
        <td class="text-align-center">
            <input type="checkbox" />
        </td>
        <td>MF1645</td>
        <td>Đỗ Đặng Phương</td>
        <td>Nam</td>
        <td class="text-align-center">18/01/2001</td>
        <td>00120103545</td>
        <td>Trưởng Nhóm</td>
        <td>Customize</td>

        <td>101870479963</td>
        <td>VietinBank</td>
        <td>Hai Bà Trưng</td>
        <td class="text-align-center">
            <span>Sửa</span>
            <EmployeeMenuContext></EmployeeMenuContext>
        </td>
    </tr>
</template>

<script>
import EmployeeMenuContext from "./EmployeeMenuContext.vue";
export default {
    name: "EmployeeDataExample",
    components: {
        EmployeeMenuContext,
    }
}
</script>
<style>

</style>