import EditBox from "components/TemplateEditor/EditBox.vue";



export default {
    title: "Edit Box"
}

const data = [{
    content: [
        { type: "heading", content: "hello", attrs: {}},
        { type: "heading", content: "hello2", attrs: {}}]
},
{
    content: []
}

]



export const Default = () => ({
    components: { EditBox },
    template: `<edit-box :dropZones = "dropZones" />`,
    props: {
        dropZones: {
            default:  data
        }
    }
})