import { Extension, Plugin } from "tiptap"



const a = new Plugin({
    props: {
        handleKeyPress: (view, event) => {
           // console.log(event,view)
        }

    }
 
})
export default class handleDOM extends Extension {

    get plugins() {
        return [ a ]
    }
}