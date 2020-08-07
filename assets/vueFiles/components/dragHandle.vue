<template>
  <div data-type = "drag_item" @mouseover = "show" @mouseleave = "hide" >
    <div v-show = "visible" 
         class = "handle"
         @mouseover = "isHandle = true" 
         @mouseleave = "isHandle = false" 
         data-drag-handle contenteditable="false">
    </div>
    <component :is="type" v-bind="attrs" ref="content"  :content ="content" :contenteditable="leaf">
   
        </component>
    </div>
</template>

<script>
import Heading from "./Heading.vue"
import Paragraph from "./Paragraph.vue"
import ImageBlock from "./Image.vue";

export default {
    name: "drag-handle",
    components: { Heading, ImageBlock  },
    props: {
        type: {
            type: String
        },
        attrs: {type: Object},
        content: {
            default: "Lol"
        },
        leaf: {
            type: Boolean,
            default: true
        },
        restrict: {
            type: Boolean,
            default: false
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
        if (this.restrict) return 
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
    display: flex;
    
}
</style>