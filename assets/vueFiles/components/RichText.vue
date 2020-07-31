<template>
   <div data-type="richtext" class="textbox">
        <div ref="content" contenteditable = "true"></div>
    </div>
</template>

<script>
export default {
    name:"rich-text"
}
</script>

<style scoped>

[data-type="richtext"] {
  border-style: solid;
  width: 50%;
}


</style>
