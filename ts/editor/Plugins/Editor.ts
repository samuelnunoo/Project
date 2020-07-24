// @ts-nocheck
import {Editor} from 'tiptap';
import {ComponentView} from "tiptap/src/Utils/ComponentView";


class subComponentView extends ComponentView {
    stopEvent(event) {
        if (typeof this.extension.stopEvent === 'function') {
          return this.extension.stopEvent(event)
        }
    
        const draggable = !!this.extension.schema.draggable
    
        // support a custom drag handle
        if (draggable && event.type === 'mousedown') {
          const dragHandle = event.target.closest
            && event.target.closest('[data-drag-handle]')
          const isValidDragHandle = dragHandle
            && (this.dom === dragHandle || this.dom.contains(dragHandle))
    
          if (isValidDragHandle) {
            this.captureEvents = false
            document.addEventListener('dragend', () => {
              this.captureEvents = true
            }, { once: true })
          }
        }
    
        const isCopy = event.type === 'copy'
        const isPaste = event.type === 'paste'
        const isCut = event.type === 'cut'
        const isDrag = event.type.startsWith('drag') || event.type === 'drop'
    
        if ((draggable && isDrag) || isCopy || isPaste || isCut) {
          return false
        }
    
        return this.captureEvents
      }
}





export default class subEditor extends Editor {


    initNodeViews({ parent, extensions }) {
        return extensions
          .filter(extension => ['node', 'mark'].includes(extension.type))
          .filter(extension => extension.view)
          .reduce((nodeViews, extension) => {
            const nodeView = (node, view, getPos, decorations) => {
              const component = extension.view
    
              return new subComponentView(component, {
                editor: this,
                extension,
                parent,
                node,
                view,
                getPos,
                decorations,
              })
            }
    
            return {
              ...nodeViews,
              [extension.name]: nodeView,
            }
          }, {})
      }   

}