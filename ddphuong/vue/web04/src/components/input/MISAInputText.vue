<template>
        <input type="text" :title="titleInput" :id="id" :placeholder="placeholder"/>
</template>

<script>
    export default {
        name: "MISAInputText",
        props: ["titleInput", "id", "placeholder"],
    }
</script>

<style>

</style>