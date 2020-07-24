import {Extension, Plugin} from "tiptap"
import { Decoration, DecorationSet } from 'prosemirror-view'

class DecorationState {
    private static _instance: DecorationState
    private _decorations:DecorationSet

    protected constructor() {
        this._decorations = DecorationSet.empty
    }

     private static get Instance () :DecorationState {
        if(!DecorationState._instance) {
            DecorationState._instance = new DecorationState()
            
        }

        return DecorationState._instance
    }

     public static get decorations ():DecorationSet {
        return DecorationState.Instance._decorations
    
    }

    public static update(decoration:DecorationSet): void {
        DecorationState.Instance._decorations = decoration
    }





}

function getPos(view,{target})  {
    const pos = view.posAtDOM(target)
    const { doc } = view.state
    const re = doc.resolve(pos)
    return {before: re.before(), after: re.after()}

}

const prop = {
    "data-type":"drag_item",
    "draggable": "true",
    "nodeName": "div"
    
   
}

const dragPlugin = new Plugin({
props: {

    handleDOMEvents: {
        mouseover (view,event) {
            if (event.target.className.includes('ProseMirror')) return 
            const {before, after} = getPos(view,event)
            const decorations: Array<Decoration> = []
            const handler = document.createElement('div')

            handler.setAttribute('style', 'width:10px; height: 10px; background:black;')
            handler.setAttribute('data-drag-handle','')
            decorations.push(Decoration.node(before,after, prop))
            decorations.push(Decoration.widget(before+1, handler, { side: -1}))
           

            const set = DecorationSet.create(view.state.doc, decorations)
            DecorationState.update(set)
            view.update(view.props)

            
    




        },
        drop (view, event) {
          console.log(event)

        },
        dragstart (view,event) {
            console.log(event.target.outerHTML)
        }
     },

     decorations () {
         return DecorationState.decorations
     },

     handleDrop (view,event,slice,moved ) {
         console.log(event)
     }
}
})


export default class DragHandler extends Extension {
    get name() {
        return 'drag_handler'
    }
    get plugins(): Array<any> {
        return [dragPlugin]
    }
}