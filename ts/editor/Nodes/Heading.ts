import { Node } from "tiptap";
import { NodeSpec } from "../../interfaces/NodeSpec";
import { wrappingInputRule } from "tiptap-commands";
import blockTypeChanged from "../Plugins/blockTypeChange";

export default class Heading extends Node {
  get name(): string {
    return "heading";
  }

  get schema(): NodeSpec {
    return {
      content: "text*",
      draggable: false,
      group: "block",
      toDOM: () => ["h1", 0],
      parseDOM: [{ tag: "h1" }]
    } as NodeSpec;
  }

}
