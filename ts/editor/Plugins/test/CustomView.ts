import ComponentView from "./ComponentView";
import Vue from 'vue'


export default class CustomView extends ComponentView {
    createDOM() {
        const Component = Vue.extend(this.component)
        const props = {
          editor: this.editor,
          type: this.node.type.spec.toDOM(this.node)[0],
          attrs: { class:'none'},
          node: this.node,
          view: this.view,
          getPos: () => this.getPos(),
          decorations: this.decorations,
          selected: false,
          options: this.extension.options,
          updateAttrs: attrs => this.updateAttrs(attrs),
        }
    
        if (typeof this.extension.setSelection === 'function') {
          this.setSelection = this.extension.setSelection
        }
    
        if (typeof this.extension.update === 'function') {
          this.update = this.extension.update
        }
    
        this.vm = new Component({
          parent: this.parent,
          propsData: props,
        }).$mount()
    
        return this.vm.$el
      }

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
    
        if (isCopy || isPaste || isCut) {
          return false
        }

        if (draggable && isDrag) {
            if (event.type == "dragstart") {
                if (!this.vm.isHandle) event.preventDefault()
            }
            return false 
        }
    
    
        return this.captureEvents
      }
}