import { Node } from "tiptap";
import { NodeSpec } from "../../interfaces/NodeSpec";
import { View } from "../../interfaces/View";
import blockTypeChanged from "../Plugins/blockTypeChange";
import newLine from "../Plugins/newLine";
import { splitBlock } from "prosemirror-commands";

export default class Container extends Node {

  get name(): string {
    return "container";
  }

  get schema(): NodeSpec {
    return {
      content: "block",
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
            <div ref="content"> </div>
            <div data-drag-handle></div>
          </div>
          `
    } as View;
  }

  inputRules({ schema, type }):Array<typeof blockTypeChanged> {
    return [
      blockTypeChanged(/^\s*#\s$/, type, schema.nodes.heading),
      blockTypeChanged(/^\s*>\s$/, type, schema.nodes.paragraph)
    ]
  }

  keys({ type }) {
    return { 
      "Enter": newLine
    
  }



}

}
