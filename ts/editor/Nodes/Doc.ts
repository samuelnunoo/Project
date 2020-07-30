import { Node } from "tiptap"
import tabSelection from "plugins/tabSelection";

export default class Doc extends Node {

  get name() {
    return 'doc'
  }

  get schema() {
    return {
      content: '(block|richtext|type)+',
    }
  }
  
  keys({ type }) {
    return {
   "Ctrl-q": tabSelection()
    }
  }

}