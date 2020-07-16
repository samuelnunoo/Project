<template>
  <editor-content :editor="editor" />
</template>

<script>
// Import the editor
import { Editor, EditorContent } from "tiptap";
import Container from "nodes/Container.js";
import Doc from "nodes/Doc.js";
import Paragraph from "nodes/Paragraph.js";
import Heading from "nodes/Heading.js";

export default {
  components: {
    EditorContent
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.editor = new Editor({
      content: `    
    
      `,
      extensions: [new Doc(), new Container(), new Paragraph(), new Heading()]
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style>
[data-type="drag_item"] {
  display: flex;
  padding: 0.5rem;
  background-color: rgba(black, 0.05);
  margin-bottom: 0.5rem;
  border-radius: 6px;
}

[data-type="drag_item"]:first-child {
  flex: 1 1 auto;
}

[data-type="drag_item"]:last-child {
  flex: 0 0 auto;
  margin-left: auto;
  cursor: move;
}
</style>
