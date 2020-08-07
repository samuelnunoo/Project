<template>
<p contenteditable="true" > {{content}} </p>
</template>

<script>
export default {
    name: "paragraph",
    props: {
        content: {
            type: String,
            default:""
        }
    }
}
</script>

<style>

</style>


