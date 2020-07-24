import { Node } from "tiptap"
import { View } from "../../interfaces/View";
import { NodeSpec } from "../../interfaces/NodeSpec"

export default class RichText extends Node {
  get name(): string {
    return "richtext";
  }

  get schema(): NodeSpec {
    return {
      content: "container+",
      group: "block",
      toDOM: () => ["div",{"data-type":"richtext"},0],
      parseDOM: [{ 
          tag: `[data-type="richtext"]`
        }]

    } as NodeSpec
  }

  get view(): View {
    return {
        template: `
        <div data-type="richtext" class="textbox">
            <div ref="content" contenteditable = "true">
            </div>
        </div>`
    }as View

} 
}
