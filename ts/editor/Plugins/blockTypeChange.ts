
import { InputRule } from 'prosemirror-inputrules';

function newNode(type,contentType) {
    return type.create({},contentType.create())
}

export default function (regexp: RegExp, type, contentType): InputRule {
    return new InputRule(regexp, (state, match, start, end) => {
        const { tr, doc } = state

        if (match[0]){
            doc.nodesBetween(start,end, (node, rangeStart) => {  
                const rangeEnd = rangeStart + node.nodeSize
                tr.replaceWith(rangeStart, rangeEnd, newNode(type,contentType))
                return false 
                } )
           // str.setBlockType(start,end, type, attrs)
        }

        return tr
    })
}

