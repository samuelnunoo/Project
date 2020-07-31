<template>
  <div data-type = "drag_item" @mouseover = "show" @mouseleave = "hide" >
    <div v-if="visible" 
         @mouseover = "isHandle = true" 
         @mouseleave="isHandle = false" 
         data-drag-handle contenteditable="false">
    </div>
    <component  :is="type" v-bind="attrs" ref="content" :contenteditable="leaf">
            {{content}}
        </component>
    </div>
</template>

<script>
export default {
    name: "drag-handle",
    props: {
        type: {
            type: String
        },
        attrs: {type: Object},
        content: {
            default: ""
        },
        leaf: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            isHandle: false,
            visible: false
        }
    },
    methods: {
    show() {
        const parent = this.$el.parentElement?.tagName
        if (parent === "LI") return
        this.$data.visible = true
    },
    hide() {
        this.$data.visible = false
    }
    }
}
</script>

<style scoped>
[data-drag-handle]{
  width: 20px;
  height: 20px;
  background:black;
}

[data-type="drag_item"]{
    
}
</style>