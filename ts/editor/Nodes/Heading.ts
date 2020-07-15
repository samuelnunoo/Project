import { Node } from "tiptap";
import { NodeSpec } from "../../interfaces/NodeSpec";

export default class Heading extends Node {
  get name(): string {
    return "heading";
  }

  get schema(): NodeSpec {
    return {
      content: "text*",
      group: "block",
      toDOM: () => ["h1", 0],
      parseDOM: [{ tag: "h1" }]
    } as NodeSpec;
  }
}
