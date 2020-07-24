import { Node } from 'tiptap'
import { splitListItem, liftListItem, sinkListItem } from 'tiptap-commands'
import { NodeSpec } from '../../interfaces/NodeSpec'

export default class ListItem extends Node {

  get name() {
    return 'list_item'
  }

  get schema(): NodeSpec {
    return {
      content: 'paragraph',
      group: 'list',
      defining: true,
      draggable: false,
      parseDOM: [
        { tag: 'li' },
      ],
      toDOM: () => ['li', 0],
    } as NodeSpec
  }

  get view(){
    return {
      template: `
      <div data-type="drag_item">
          <div data-drag-handle> [] </div>
          <div ref="content" /> 
      </div>
      `

    }
   
  }

  keys({ type }) {
    return {
      Tab: sinkListItem(type),
      'Shift-Tab': liftListItem(type),
    }
  }

}