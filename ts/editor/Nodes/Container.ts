import { Node } from "tiptap";
import { NodeSpec } from "../../interfaces/NodeSpec";
import { View } from "../../interfaces/View";
import blockTypeChanged from "../Plugins/blockTypeChange";
import newLineUtility from "../Plugins/newLine";
import { splitBlock } from "prosemirror-commands";

export default class Container extends Node {

  get name(): string {
    return "container";
  }

  get schema(): NodeSpec {
    return {
      content: "(block|type|list)",
      draggable: true,
      toDOM: () => ["div", { "data-type": "drag_item" }, 0],
      parseDOM: [
        {
          tag: `[data-type="drag_item"]`
        }
      ] 
    } as NodeSpec;
  }

  get view(): View {
    return {
      template: `
          <div data-type="drag_item">
          <div data-drag-handle></div>
            <div ref="content"> 
            </div>
          </div>
          `
    } as View;
  }

  inputRules({ schema, type }):Array<typeof blockTypeChanged> {
    return [
      blockTypeChanged(/^\s*#\s$/, type, schema.nodes.heading),
      //blockTypeChanged(/^\s*>\s$/, type, schema.nodes.paragraph),
      blockTypeChanged(/^\s*@\s$/, type, schema.nodes.testblock),
      blockTypeChanged(/^\s*>\s$/, type, schema.nodes.blockquote),
      blockTypeChanged(/^\s*([-+*])\s$/, type, schema.nodes.bullet_list),
      blockTypeChanged(/^\s*(\[ \])\s$/, type, schema.nodes.todo_list),
    ]
  }

  keys({ type }) {
    return { 
      "Enter": newLineUtility.Instance.newLine.bind(newLineUtility.Instance)
    
  }



}

}
