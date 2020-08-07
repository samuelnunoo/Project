import PmCard from "components/TemplateEditor/Component.vue";



export default {
    title: "Type Edit Components"
}

export const Heading = () => ({
components: {  PmCard },
template: `<pm-card type="heading" content="Hello World"/>`,
})

export const HeadingEmpty = () => ({
components: { PmCard },
template: `<pm-card type="heading" />`
})

export const Image = () => ({
    components: { PmCard },
    template: `<pm-card type="image-block" :attrs="attrs" />`,
    props: {
        attrs:{
            default: {
                src: "https://images.unsplash.com/photo-1560421683-2587f1591d30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            }
        }
    }
})

export const EmptyImage = () => ({
    components: { PmCard },
    template: `<pm-card type="image-block" />`,
   
})


export const RichText = () => ({
    components: { PmCard },
    template: `<pm-card type="rich-text" content="Hello World" />`
})


export const EmptyRichText = () => ({
    components: { PmCard },
    template: `<pm-card type="rich-text" />`
})