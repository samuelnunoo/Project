<template>
<div class='editor'>
  <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
// Import the editor
import { EditorContent } from "tiptap";
import Icon from "components/Icon.vue"
import javascript from 'highlight.js/lib/languages/javascript'
import Paragraph from "nodes/Paragraph.js";
import Nodes from "plugins/ViewInjector";
import {DragHandle} from "tiptap-extensions";
import Editor from "plugins/Editor.js";

export default {
  components: {
    EditorContent,
    Icon
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.editor = new Editor({
      content: `Testing 1 2 3
      Testin 2 2 3
    
      `,
      extensions: [
    // ...new Nodes().nodes

      ]
    });
    this.editor.getJSON()

    //const schema = this.editor.schema
    //const plugin = new DragContainer(schema).plugin
    //this.editor.registerPlugin(plugin)

  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="scss">
@import "/assets/media/todo.scss";

[data-drag-handle]{
  width: 20px;
  height: 20px;
  background:black;
}
[data-type="drag_item"] {
  display:auto
}
.ProseMirror {
  margin: auto;
  width: 50%;
}
pre {
  &::before {
    content: attr(data-language);
    text-transform: uppercase;
    display: block;
    text-align: right;
    font-weight: bold;
    font-size: 0.6rem;
  }
  code {
    .hljs-comment,
    .hljs-quote {
      color: #999999;
    }
    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f2777a;
    }
    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #f99157;
    }
    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #99cc99;
    }
    .hljs-title,
    .hljs-section {
      color: #ffcc66;
    }
    .hljs-keyword,
    .hljs-selector-tag {
      color: #6699cc;
    }
    .hljs-emphasis {
      font-style: italic;
    }
    .hljs-strong {
      font-weight: 700;
    }
  }
}

</style>
