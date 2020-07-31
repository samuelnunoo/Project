<template>
<button>
<img src="https://images.unsplash.com/photo-1560421683-2587f1591d30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
</button>
</template>

<script>
export default {
    name: "views",
    props: {
        value: {
            type: String,
            required: true,
            default: ""

        }
    }
    
}
</script>