
import { InputRule } from 'prosemirror-inputrules';

function newNode(type,contentType) {
    return type.create({},contentType.createAndFill())
}

export default function (regexp: RegExp, type, contentType): InputRule {
    return new InputRule(regexp, (state, match) => {
        const { tr } = state
        const { $from } = state.selection
        const parent = $from.depth - 1
        const node = newNode(type,contentType)

        if (match[0]){
            tr.replaceWith($from.before(parent)  , $from.after(parent) , node)
        }

        return tr
    })
}

