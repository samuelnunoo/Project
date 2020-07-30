
import { Paragraph } from 'tiptap';
import * as extension from 'tiptap-extensions';
import RichText from "nodes/RichText"
import TestBlock from "nodes/TestBlock";

const exclude = [
    "list_item",
    "ordered_list",
    "todo_list",
    "todo_item",
    "bullet_list"
]
const nodes =  [
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
    new RichText(),
    new TestBlock(),
]

export default class Nodes {
    private _nodes: Array<any>

    constructor() {
        this._nodes = nodes

        this.init()
    }

    init (): void {

        for (const node of this._nodes) {
            

            if (exclude.includes(node.name)) continue
        
            
             Object.defineProperty(node, 'view', { 
                get: function() {
                    return {
                        props: ['type','attrs'],
                

                        template: `
                        <div data-type = "drag_item" @mouseover = "show" @mouseleave = "hide" >
                            <div v-if="visible" @mouseover = "isHandle = true" @mouseleave="isHandle = false" data-drag-handle contenteditable="false"></div>
                            <component  :is="type" v-bind="attrs" ref="content" contenteditable="true" />
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


