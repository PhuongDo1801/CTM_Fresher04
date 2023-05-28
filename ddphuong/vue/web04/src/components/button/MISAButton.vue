<template>
    <div>
        <button :id="id" :class="btnClass">{{ text }}</button>
    </div>
</template>

<script>

export default {
    name: "MISAButton",
    props: ["id", "btnClass", "text"],

}
</script>

<style>

</style>