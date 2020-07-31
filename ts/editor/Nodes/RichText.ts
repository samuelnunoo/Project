import { Node } from "tiptap"
import { View } from "../../interfaces/View";
import { NodeSpec } from "../../interfaces/NodeSpec"
import blockTypeChange from "plugins/blockTypeChange";
import richTextView from "components/RichText.vue"

export default class RichText extends Node {
  get name(): string {
    return "richtext";
  }

  get schema(): NodeSpec {
    return {
      content: "block+",
      group: "container",
      toDOM: () => ["div",{"data-type":"richtext"},0],
      parseDOM: [{ 
          tag: `[data-type="richtext"]`
        }]

    } as NodeSpec
  }

  get view() {
    return  richTextView
  }

  inputRules({ type }) {
    return [
      blockTypeChange(/^@2\s$/, type)
    ]

  }


}
