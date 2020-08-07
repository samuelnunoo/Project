<template>
<draggable
    tag = "v-row"
    v-model = "result"
    group = "drop-zone"
    @end = "emit"
    swapThreshold = "0"
>
    <v-col
        v-for = "element in result"
    >
    
        <pm-card
            draggable = "true"
            @drag.native = "test"
            @mouseover.native = "test2"
            :type = "element.type"
            :content = "element.content"
            :attrs = "element.attrs"

        />
    </v-col>
</draggable>
</template>

<script>
import PmCard from "./Component"
import draggable from "vuedraggable"

export default {
    name: "drop-box",
    components: { draggable, PmCard },
    data() {
        return {

            result: []
            
        }
    },
    props: {
        contentData: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        emit (event) {
            this.$parent.$emit('dragEvent', event)
        },
        test2 (event) {
            console.log(event)
        }, 
        test ({clientX, clientY, target}) {
         
        }
    },
    mounted() {
        this.contentData.forEach( element => this.result.push(element))
    }

}
</script>