    import {insertPoint} from "prosemirror-transform";

    class NewLineBackend {
        protected _regex: RegExp;
     
        protected $from
        protected $anchor
        protected schema
        protected tr
        protected doc
        protected depth
        protected dispatch
        protected container
        protected parent

        protected constructor() {
            this._regex = /^\s*$/

        }
        protected setEnv (state, dispatch) {
            const  { $from, $anchor} = state.selection
            const { schema, tr, doc} = state
            const depth = $anchor.depth
            let parent = depth

            

            this.$from = $from
            this.$anchor = $anchor
            this.schema = schema
            this.tr = tr
            this.doc = doc
            this.depth = depth
            this.dispatch = dispatch
            this.container = this.schema.nodes.container

            do { parent -= 1 } while( this.$from.node(parent).type.name !== 'container')
            this.parent = parent
        }
        protected replaceContainer(node): void {
            this.tr.replaceWith(this.$from.before(this.parent)  , this.$from.after(this.parent), node) 
        }
        protected getTruncatedNode () {
            return this.$from.node().cut(0, this.$from.parentOffset)

        }
        protected getPushedContent() {
            return this.$from.node().cut(this.$from.parentOffset, this.$from.node().nodeSize-2)
        }
        protected createContainer(content) {
            return this.container.create({}, content)
        }
        protected extractText(node) {
            return node.textContent.length > 0 
            ? node.textContent : ""

        }
        protected newParagraph () {
            const {paragraph} = this.schema.nodes
            const text = this.getText()
            if (text.match(this._regex) !==null) return paragraph.createAndFill()
            else return paragraph.create({},this.schema.text(text))
         
        }
        protected getText(){
            const node = this.getPushedContent()
            return this.extractText(node)
        }
        protected getListType(){
            return this.$from.node(this.depth-2).type.name
        }
        protected insertNode(node) {
            const endPos = this.$from.end(this.parent)
            const pos = insertPoint(this.doc, endPos, this.container)
            this.tr.insert(pos, node)
        }
        protected getListContent() {
            const text = this.getText()
            const type = this.getListType()
            const list_type = this.schema.nodes[type]
            if (text.match(this._regex) !==null) return list_type.createAndFill()
            else return list_type.create({}, this.schema.text(text))
        }

        protected creationSequence(content) {
            const replaceContent = this.getTruncatedNode()
            const newNode = this.createContainer(content) 
            this.insertNode(newNode)
            this.replaceContainer(replaceContent)

        }

        protected createDefault() {
            return this.createContainer(this.newParagraph ())
        }
 
    }

    export default class NewLineManager extends NewLineBackend {
        protected static instance: NewLineManager

        public static get Instance() {
            if (!NewLineManager.instance){
                NewLineManager.instance = new NewLineManager()
            }
            return NewLineManager.instance
        }

        public newLine (state, dispatch) {
            
            this.setEnv(state,dispatch)
            
            const isBlock = this.$anchor.node().type.spec.group === 'block'
            const isList = this.$anchor.node(this.depth-1).type.spec.group === 'list'

            if (isBlock && !isList) this.newBlock()
            if (isList) this.newList()

            if(this.dispatch) this.dispatch(this.tr)

        }

        protected newBlock() {
            const content = this.newParagraph ()
            this.creationSequence(content)
        }

        protected newList() {
            const hasContent = this.$from.node().textContent !== ''
        
            if (hasContent) {
                const content = this.getListContent()
                this.creationSequence(content)

            }
            else  {
            const newNode = this.createContainer(this.newParagraph ())
            this.replaceContainer(newNode)
            } 



        }
    }


