import { Node } from "tiptap";
import { NodeSpec } from "../../interfaces/NodeSpec";
import { View } from "../../interfaces/View";

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
          <div data-type="drag_item" contenteditable="false">
            <div ref="content" contenteditable="true"> </div>
            <div data-drag-handle></div>
          </div>
          `
    } as View;
  }
}
