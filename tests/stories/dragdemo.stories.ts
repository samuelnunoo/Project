import dragdemo from "components/DragDemo.vue";



export default {
    title: "Drag Demo"
}


export const DragDemo = () => ({
    template: `<drag-demo />`,
    components: {"drag-demo":dragdemo},

})

