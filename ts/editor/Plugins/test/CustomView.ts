import ComponentView from "./ComponentView";
import Vue from 'vue'


export default class CustomView extends ComponentView {
    createDOM() {
        const Component = Vue.extend(this.component)
        const props = {
          editor: this.editor,
          type: this.node.type.spec.toDOM(this.node)[0],
          attrs: { class:'none'},
          show: false,
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
         data: function() {
             return { show: false}
         },
          parent: this.parent,
          propsData: props,
        }).$mount()
    
        return this.vm.$el
      }
}