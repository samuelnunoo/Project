    function newParagraph(schema,text){
        const {paragraph} = schema.nodes
        if (text === "") return paragraph.createAndFill()
        else return paragraph.create({},schema.text(text))
     
    }

    
    export default function (state, dispatch, view)  {
        const  {from, $from, to, $anchor} = state.selection
        const { schema, tr, doc} = state
        const type = $anchor.node().type.name
        const container = schema.nodes.container

        if (type == 'paragraph' || type == 'heading') {
            doc.nodesBetween(from, to, (node, startPos) => {
             
                const endPos: number = startPos + node.nodeSize 
                const chilNode = node.firstChild
                const newNode = chilNode.cut($from.parentOffset,chilNode.nodeSize-2)
                const text:string = newNode.textContent.length > 0 ? newNode.textContent : ""
                const newOrigin = node.cut(0,$from.parentOffset+1)
                tr.replaceWith(startPos, endPos, newOrigin)

                const newEnd:number = startPos + newOrigin.nodeSize
                tr.insert(newEnd, container.create({},  newParagraph(schema,text)))

                return false })

       
          
         


        }

        if (dispatch) {
            dispatch(tr)
        }

        


    }
