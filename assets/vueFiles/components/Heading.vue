<template>
<h1 :contenteditable="canEdit"> {{content}} </h1>
</div>
</template>

<script>

export default {

    name:"heading",
    props:{
        content: {
            default:"Default Heading",
            type: String
        },
        canEdit: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            visible: true
        }
    },

}
</script>

<style>
</style>