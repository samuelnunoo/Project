import { Node } from "tiptap"
import { NodeSpec } from "../../interfaces/NodeSpec"
import { View } from "../../interfaces/View";
import  blockTypeChange from "plugins/blockTypeChange";

export default class TestBlock extends Node {

    get name(): string {
        return 'testblock'
    }

    get schema(): NodeSpec {
        return {
            content: "heading{1} richtext{1}",
            group: "type",
            draggable: false,
            toDOM: () => ["div", {"data-type":this.name}, 0],
            parseDOM:  [   {
                 tag: `[data-type="${this.name}"]`
            }]
        } as NodeSpec
    }


    inputRules({ type }): Array<any> {
        return [
            blockTypeChange(/^@\s$/, type)
        ]
    }

 

    }
