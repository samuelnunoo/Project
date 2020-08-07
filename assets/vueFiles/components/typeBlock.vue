Y
<template>
<v-card>
    <draggable handle=".handle" v-model="contentData" class="type" tag="v-container" ref="content" >
        <v-row
           v-for="element in contentData">
        <drag-handle 
            :type="element.tag"
            :content="element.content"
            :attrs="element.attrs"
            :leaf="true"
            :restrict="true">
        </drag-handle>
        </v-row>
                
    </draggable>
</v-card>

</template>


<script>
import draggable from "vuedraggable"
import dragHandle from "./dragHandle.vue"

export default {
    name: "type-block",
    components: { draggable, dragHandle},
    props: {
        contentData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            hover: true
        }
    }
 

}

</script>

<style scoped>
.type{
    padding:12px;
    margin: auto;
}

.v-card{
    margin: auto;
    width: 50%;
}

</style>