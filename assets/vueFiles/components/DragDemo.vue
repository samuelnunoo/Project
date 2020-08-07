<template>
<v-container class = 'border'>
    <v-row v-for = "(row, index) in rows" :index = "index">
        <v-col  v-for= "(col, subIndex) in row.cards"  :col="subIndex" :row="index" >
            <pm-card 
                @mousedown.native = 'init' 
                style = 'width: 100%;'
                :col = "subIndex" 
                :row="index" 
                class = 'brick'
                :type = "col.type"
                :attrs = "col.attrs"
                :content = "col.content" 
            />
        </v-col>
    </v-row>
    <div class = 'add' />
</v-container>
</template>


<script>
import pmCard from "./TemplateEditor/Component.vue";
export default{
    name:'drag-demo',
    components: {'pm-card': pmCard},
    data() {
        return {
            isDrag: false,
            element: null,
            bias: null,
            pageX: 0,
            pageY: 0,
            debounce: false,
            collided: null,
            oldData: null,
            offsetLeft: 0,
            offsetTop: 0,
            initX: 0,
            initY: 0,
            target: null,
            bricks: [],
            rows: [
                {
                cards: [
                    {
                        type: 'heading',
                        attrs: {},
                        content: "Hello World 1"
                    },
                        {content: "hello two",
                        attrs: {},
                        type: 'heading'
                        }
                    ]
                },
                 {
                cards: [
                    {
                        type: 'heading',
                        attrs: {},
                        content: "Hello World 1"
                    },
                        {content: "hello two",
                        attrs: {},
                        type: 'heading'
                        }
                    ]
                }
            ]
       
        }
    },
    methods: {
        init(event) {
            event.preventDefault()
            event.stopPropagation()
            this.debounce = false
            this.isDrag = true
           
            this.initX = event.pageX
            this.initY = event.pageY

            this.target = event.currentTarget.cloneNode(true)
            this.$el.appendChild(this.target)
            const row = parseInt(this.target.getAttribute('row'))
            const col = parseInt(this.target.getAttribute('col'))
            this.target.style.position = "absolute"

            this.target.classList.remove("brick")
            this.target.classList.add("box")
 

            this.offsetLeft = this.initX + 10
            this.offsetTop = this.initY 

            this.oldData = this.rows[row].cards.splice(col,1)[0]

            document.addEventListener('mousemove', (e) => this.moveObject(e), false )
            document.addEventListener('mouseup', (e) => this.stopDrag(e), false)
            this.bricks = document.querySelectorAll('.brick')
        },
        reset() {
        
            const row = parseInt(this.target.getAttribute("row"))
            const col = parseInt(this.target.getAttribute("col"))

            const newArray = this.deepCopy(this.rows)
            newArray[row].cards.splice(col,0, this.oldData)
            this.rows = newArray
   


        },
        stopDrag(event) {
        
                if (this.element) this.element.remove()
           // this.target.fistsChild.className =  "brick"
            document.removeEventListener('mousemove', this.moveObject, false)
            document.removeEventListener('mouseup', this.stopDrag, false)
            if (this.debounce) return 
            if (this.collided && this.bias && this.isDrag) this.placeDragged(this.collided,this.target,this.bias)
            else if (!this.collded && this.isDrag) this.reset()
            this.isDrag = false
            this.debounce = true
            this.target.remove()
      

       
        },
        isRow(index) {
           return  this.rows[index] !== undefined
        },
        isCol(row,index) {
            return row.cards[index] !== undefined
        },
        deepCopy(array) {
            const arr = []
            array.forEach( item => arr.push(item))
            return arr
        },
        createNew(row,col,target, tindex) {
            const newArray = this.deepCopy(this.rows)
          
            switch(this.bias) {
                case "left":
                    newArray[row].cards.splice(col -1, 0, this.oldData)
                    break;
                case "right":
                    newArray[row].cards.splice(col + 1, 0, this.oldData)
                    break;
                case "top":
                    newArray.splice(row, 0, { cards: [this.oldData]})
                    break;
                case "bottom":
                    newArray.splice(row + 1, 0 ,{ cards: [this.oldData]})
                    break;
            }

            this.rows = newArray

        },
        placeDragged(hit, target, bias) {
            const hrow = parseInt(hit.getAttribute('row'))
            const hcol = parseInt(hit.getAttribute('col'))
            const trow = parseInt(target.getAttribute("row"))
            const tcol = parseInt(target.getAttribute("col"))

            if(this.isRow(hrow)) {
                if (this.isCol(this.rows[hrow], hcol)){
                    this.createNew(hrow,hcol, this.rows[trow].cards, tcol)

                }
            }








          //  target.style.position = "inherit"
          //  hit.appendChild(target)
            

        },
        moveObject({ pageX, pageY }) {
            if (this.isDrag) {
                this.pageX = pageX
                this.pageY = pageY
                const top = this.offsetTop + (pageY - this.initY)
                const left = this.offsetLeft + (pageX - this.initX)
                this.target.style.top = top + 'px'
                this.target.style.left = left + 'px'

                this.checkCollision()
         
            }
           
        },
        collisionCheck(brick, { left,right,top,bottom }) {
                const pos = brick.getBoundingClientRect()
                const leftSide = this.compare(this.pageX, pos.left, pos.right)
                const rightSide = this.compare(this.pageX,pos.left, pos.right)
                const topSide = this.compare(this.pageY, pos.top, pos.bottom)
                const bottomSide = this.compare(this.pageY,pos.top, pos.bottom)

                return (leftSide || rightSide) && (topSide || bottomSide)
        },
        calculateBias(brick,pos) {
            const {width, height, left, top} = brick.getBoundingClientRect()
            const xDiscriminator = left + (width/2)
            const yDiscriminator = top + (height/2)

            const rightSide= (this.pageX - left) / width
            const leftSide = ((left + width) - this.pageX) / width
            const topSide = ((top + height) - this.pageY) / height
            const bottomSide = (this.pageY - top) / height

            const sides = {
                'left': leftSide,
                'right': rightSide,
                'top': topSide,
                'bottom': bottomSide
            }

            const max = Object.keys(sides).reduce( (a,b) => sides[a] > sides[b] ? a : b)
            return max

        },
        visualizeBias(brick, bias) {
            const thickness = 5
            if (this.element) this.element.remove()
            this.element = document.createElement('div')
            this.element.className = "blue_bar"
            this.$el.appendChild(this.element)
            this.element.style.position = "absolute"
            const pos = brick.getBoundingClientRect()
            this.element.style.background = "blue"
            this.element.style.opacity = 0.5



            switch(bias) {
                case "left":
                    this.element.style.width = thickness + "px"
                    this.element.style.height =  pos.height + "px"
                    this.element.style.top = pos.top  + "px"
                    this.element.style.left = pos.left - thickness + "px"
                    break;
                case "right":
                    this.element.style.width = thickness + "px"
                    this.element.style.height =  pos.height + "px"
                    this.element.style.top = pos.top  + "px"
                    this.element.style.left = pos.left + pos.width + "px"
                    break;
                case "top":
                    this.element.style.width = pos.width + "px"
                    this.element.style.height =  thickness + "px"
                    this.element.style.top = pos.top - thickness  + "px"
                    this.element.style.left = pos.left  + "px"
                    break;
                case "bottom":
                    this.element.style.width = pos.width + "px"
                    this.element.style.height = thickness + "px"
                    this.element.style.top = pos.top + pos.height + "px"
                    this.element.style.left = pos.left + "px"
                    break;
                    
            }

         

        },
        setCollidor (pos) {
            for (const brick of this.bricks) {
                const isCollide = this.collisionCheck(brick, pos)

                if (isCollide) {
                    this.collided = brick
                    break;
                }
            }
        },
        checkCollision () {
            const targetPos = this.target.getBoundingClientRect()

            if (this.collided) {
                const isCollide = this.collisionCheck(this.collided, targetPos)
                if (isCollide) {
                    this.bias = this.calculateBias(this.collided, targetPos)
                    this.visualizeBias(this.collided,this.bias)
                    return 
                }
                else {
                    this.collided = null
                }
              
               
            }

            this.setCollidor(targetPos)
        
        
        },
        getPos({x, y, currentTarget }) {
            const {width, height} = currentTarget.getBoundingClientRect()

            const left = x
            const right = x + width
            const top = y
            const bottom = y + height

            return {left, right, top, bottom}
        
        },
        compare(x,y,z) {
            return x >= y && x <= z
        },

    }
}

</script>
<style scoped>

.border{
    background: grey;
}
.add{
    height: 40px;
    width: 100%;
}

.box {


    
}

.brick {
    cursor: move;
}
</style>