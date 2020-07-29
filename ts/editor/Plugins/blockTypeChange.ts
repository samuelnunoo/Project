
import { InputRule } from 'prosemirror-inputrules';

function newNode(contentType) {
    return contentType.createAndFill()
}

export default function (regexp: RegExp, contentType): InputRule {
    return new InputRule(regexp, (state, match) => {
        const { tr } = state
        const { $from } = state.selection
        const parent = $from.depth
        const node = newNode(contentType)

        if (match[0]){
            tr.replaceWith($from.before(parent), $from.after(parent) , node)
        }

        return tr 
    })
}

