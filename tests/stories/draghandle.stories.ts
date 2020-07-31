import dragHandle from "components/dragHandle.vue";
import richTextView from "vue"


export default {
    title: "Drag Handle"

}

const propData = {
    visible: {
        default: true 
    },
    type: {
        default: "p"
    },
    attrs: {
        default: {}
    },
    content: {
        default: "Hello World"
    },
    leaf: {
        default: true
    }
}
const template = `<drag-handle :leaf="leaf" :visible="visible" :attrs="attrs" :type="type" :content="content"> </drag-handle>`
const content = {
    components: { dragHandle },
    template: template,
}

export const Paragraph = () => ({
    ...content,
    props: propData})

export const Heading = () => ({
    ...content,
    props: {
        ...propData,
        type: {
            default: 'h1'
        }
    }
})

export const HorizontalRow = () => ({
    ...content,
    props: {
        ...propData,
        type: {
            default: "hr"
        },
        content: {
            default: ""
        },
        leaf: {
            default: false 
        }
    }
})

export const Image = () => ({
    ...content,
    props: {
        ...propData,
        type: {
            default: "img"
        },
        attrs: {
            default: {
                src: "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/03/acj-2003-beautiful-landscapes-around-the-world-21.jpg"
            }
        }
    }
})