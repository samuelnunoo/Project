<template>

<component  :is='tag'  v-bind="attrs"/>

</template>


<script>
export default {
 props: {
     attr: Object,
    tag: String
 }
}
</script>