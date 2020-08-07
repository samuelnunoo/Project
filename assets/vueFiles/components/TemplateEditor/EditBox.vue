<template @dragEvent = "main">
<v-card @dragEvent="main" ref = "container" >
    <drop-box
        v-for ="item in zones" 
        :contentData = "item.content" 
    />
</v-card>

</template>



<script>
import PmCard from "./Component.vue";
import dropbox from "./DropBox.vue"
import draggable from "vuedraggable"
import Vue from "vue"

export default {
    name: "edit-box",
    components: { draggable, "drop-box":dropbox },
    data() {
        return {
            zones: []
        }
    },
    props: {
        dropZones : {
            default: () => []
        }
    },
    methods: {
        test (event) {
            console.log(event)
        },
        
        test2 (event,event2) {
            console.log(event, event2)
        },

        main(event) {
            const pos1 = this.getPos(event.clone)
            const pos2 = this.getPos(event.from)

            this.checkBounds(pos1,pos2)




            
         
     

        },
        

        createContainer (card, box) {
             this.dropZones.push({ content: [] })
     
        },

        getPos(item) {
            return item.getBoundingClientRect()
        },
        checkBounds(pos1,pos2) {
            const isCollide = this.Bounds(pos1,pos2)


        },
        Bounds(x,y) {
            const left = x.left >= y.left && x.left <= y.right
            const right = x.right >= y.left && x.right <= y.right
            const top = x.top >= y.top && x.top <= y.bottom
            const bottom = x.bottom >= y.top && x.bottom <= y.bottom

            return left || right || top || bottom
        },

        getChild(event) {
            return event.item
        }

    },

    mounted() {
        this.dropZones.forEach(element => this.zones.push(element))
        }
    
}

</script>