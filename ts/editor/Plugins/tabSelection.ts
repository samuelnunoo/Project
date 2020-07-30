import { TextSelection } from "prosemirror-state";

function isContainer(node): boolean {
    const group:string | undefined = node.type.spec.group 
    return group === "container" || group === "type"
}

export default function () {
    return (state, dispatch) => {
        const { $from } = state.selection
        const {tr} = state
        const depth = $from.depth
        const { doc} = state 
    
        const target = $from.node(depth)
        const parent = $from.node(depth - 1)
        const local_pos = $from.parentOffset + target.nodeSize
    
        if (!isContainer(parent)) return
        if (target == parent.lastChild) return 
    
        const {node, offset} = parent.childAfter(local_pos)
        if (node == undefined) return 

        const pos: number = $from.start() + offset
        
        const selection = TextSelection.create(doc, pos)
        tr.setSelection(selection).scrollIntoView()
        
        if (dispatch) {
            dispatch(tr)
        }


    }
}














