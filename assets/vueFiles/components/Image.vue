<template>
<v-img :placeholder="placeholder" v-bind="attrs" > </v-img>
</template>

<script>
export default {
    name: "image-block",
    props: {
        attrs: {
            type: Object,
        }
    },
    data() {
        return {
            styleObject: {
                width: "400px",
                height: "400px"
            },
            placeholder: "https://picsum.photos/id/11/100/60"
        }
    }
    
}
</script>

<style>


</style>