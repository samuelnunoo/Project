<template>
<div>
<img :style="styleObject" :src="img" />
</div>
</template>

<script>
export default {
    name: "views",
    props: {
        img: {
            type: String,
            default: ""

        }
    },
    data() {
        return {
            styleObject: {
                width: "400px",
                height: "400px"
            }
        }
    }
    
}
</script>