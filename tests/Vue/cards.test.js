const { shallowMount, mount, createLocalVue } = require("@vue/test-utils");
const { Editor } = require("tiptap");
const page = require("pages/Editor.vue").default

describe("Container Feature", () => {
  it('should render', () => {
    const wrapper = mount(page, {});
    wrapper.vm.editor.should.exist();
  })

});
