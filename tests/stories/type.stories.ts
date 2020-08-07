import typeBlock from "components/typeBlock.vue";

export default {
    title: "Type Block"
}

const data = [
    {tag: "heading", content: "Hello Worlds", attrs: {}},
    {tag: "heading", content: "Hello World2", attrs: {}},
    {tag: "image-block", attrs: {src:  "https://images.unsplash.com/photo-1560421683-2587f1591d30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}}

]

export const Default = () => ({
    components: {typeBlock},
    template: `
    <type-block :contentData="content"/>`,
    props: {
        img: {
            default:  "https://images.unsplash.com/photo-1560421683-2587f1591d30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        content: {
            default: data
        }
    }
})


export const Customize = () => ({
    
})

