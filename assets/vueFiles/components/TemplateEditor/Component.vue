<template>
<v-card class="template">
    <v-container>

<v-row> 
     <v-menu absolute v-model="showMenu">
         <template v-slot:activator ="{ on , attrs}">
              <v-btn v-bind="attrs" v-on="on" > Hi </v-btn>
        </template>
       <v-list>
        <v-list-item
            v-for="(item,index) in items"
            :key="index"
            @click="trigger(item)"
        >
            <v-list-item-title>{{ item.title}} </v-list-item-title>
        </v-list-item>
        </v-list>
</v-menu>
</v-row>
<v-row no-gutters>
    <v-col 
        cols="1"
    >
        <div class = 'handle' />
    </v-col>
    <v-col cols="11">
        <component
            @click.native="trigger"
            @mouse
            :is='contentType' 
            :attrs="attrs"
            :canEdit="false" 
            :content = "content" 
            class = 'content'>
        </component>

    </v-col>
    </v-row>




</v-container>
</v-card>



</template>

<script>
import elements from "../index.js";

export default {
    name: "pm-card",
    components: { ...elements },
    data() {
        return {
                showMenu: false,
                contentType: null,
                items: [ {title: "Heading", type:'heading'},
                        {title: "Image", type: 'image-block'}]
        }
    },
    props: {
        type: {
            type: String,
            default: "heading"
        },
        attrs: {
            type: Object,
            default:() => {}
        },
        content: {
            type: String,
            default: ""

        }
    }, 
    methods: {
        trigger(item) {
            this.contentType = item.type
        console.log(item)
        }
    },
    mounted() {
        this.contentType = this.type 
    }

}

</script>

<style scoped>

.v-card{
    display:flex;
    width:50%;
    
}

.handle{
    width: 100%;
    height: 100%;
    background:grey;
}

.content{
    height: 100%;
    width: 90%;
    padding-left: 40px;
}

</style>