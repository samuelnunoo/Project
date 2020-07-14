import { Node } from "tiptap";
import { NodeSpec } from "../../interfaces/NodeSpec";

export default class Paragraph extends Node {
  get name(): string {
    return "paragraph";
  }

  get schema(): NodeSpec {
    return {
      content: "text*",
      group: "block",
      draggable: false,
      toDOM: () => ["p", 0],
      parseDOM: [{ tag: "p" }]
    } as NodeSpec;
  }
}
