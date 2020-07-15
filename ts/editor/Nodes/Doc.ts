import { Node } from "tiptap"



export default class Doc extends Node {
  get name(): string {
    return "doc";
  }

  get schema(): Record<string,unknown> {
    return {
      content: "container+"
    };
  }
}
