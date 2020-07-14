import { Node } from "tiptap";
import { NodeSpec } from "../../interfaces/NodeSpec";

export default class Doc extends Node {
  get name(): string {
    return "doc";
  }

  get schema() {
    return {
      content: "container+"
    };
  }
}
