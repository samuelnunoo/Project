import { Node } from "tiptap"
import { NodeSpec } from "../../interfaces/NodeSpec"
import { View } from "../../interfaces/View";

export default class TestBlock extends Node {

    get name(): string {
        return 'testblock'
    }

    get schema(): NodeSpec {
        return {
            content: "heading{1} richtext{1}",
            group: "type",
            draggable: false,
            toDOM: () => ["div", {"data-type":"testblock"}, 0],
            parseDOM:  [   {
                 tag: `[data-type="testblock"]`
            }]
        } as NodeSpec
    }

    get view(): View {
        return {
            template: `
            <div data-type="testblock">
                <div ref="content" contenteditable = "true">
                </div>
            </div>`
        }as View

    } 

        

    }
