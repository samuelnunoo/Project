import Test from "components/Element.vue";
import  { shallowMount, mount, createLocalVue } from "@vue/test-utils"
import { Editor } from "tiptap";
import dragHandle from "components/dragHandle.vue";



describe("test", () => {
    const wrapper = mount(dragHandle)


    it("can load", () => {

        wrapper.attributes("src").should.equal("ok")
        
    })
})

