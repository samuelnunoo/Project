
import { Paragraph } from 'tiptap';
import * as extension from 'tiptap-extensions';

export default class Nodes {
    private _nodes: Array<any>

    constructor() {
        this._nodes = [
            new Paragraph(),
            new extension.HorizontalRule(),
            new extension.Heading(),
            new extension.Blockquote(),
            new extension.BulletList(),
            new extension.CodeBlock(),
            new extension.CodeBlockHighlight(),
            new extension.HardBreak(),
            new extension.Image(),
            new extension.ListItem(),
            new extension.Mention(),
            new extension.OrderedList(),
            new extension.TodoItem(),
            new extension.TodoList(),
        ]

        this.init()
    }

    init (): void {

        for (const node of this._nodes) {
            const tag = node.schema.toDOM(node.schema)[0]
            if (tag.toLowerCase().includes('object')) continue;
            
            
            Object.defineProperty(node, 'view', { 
                get: function() {
                    return {
                        template: `
                        <div data-type="drag_item">
                            <div data-drag-handle></div>
                            <${tag} ref="content"></${tag}>
                        </div>`
                    }
                }
            })

            const schema = { ...node.schema }
            schema.draggable = true 
            Object.defineProperty(node, 'schema', { 
                get: function() {
                    return  schema
                }
            })


        }
    }

    get nodes (): Array<any> {
        return this._nodes
    }
}


