import CustomView from "./CustomView";
import {Editor} from 'tiptap';



export default class subEditor extends Editor {


    initNodeViews({ parent, extensions }) {
        return extensions
          .filter(extension => ['node', 'mark'].includes(extension.type))
          .filter(extension => extension.view)
          .reduce((nodeViews, extension) => {
            const nodeView = (node, view, getPos, decorations) => {
              const component = extension.view
    
              return new CustomView(component, {
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