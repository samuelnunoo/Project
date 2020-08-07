<template>
   <div data-type="richtext" class="textbox">
        <div ref="content" :contenteditable = "canEdit">
          {{ content }}
        </div>
    </div>
</template>

<script>
export default {
    name:"rich-text",
    props: {
      canEdit: {
        type: Boolean,
        default: true
      },
      content: {
        type: String,
        default: "fd"
      }
    }
}
</script>

<style scoped>

[data-type="richtext"] {
  border-style: solid;
  width: 50%;
}


</style>
