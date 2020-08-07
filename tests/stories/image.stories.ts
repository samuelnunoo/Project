import { action } from '@storybook/addon-actions';
import Vue from 'vue'
import ImageBlock from "components/Image.vue";


export default {
  title: 'Image Component',
};

export const Image = () => ({
  components: { ImageBlock },
  template: '<image-block :img="img" ></image-block>',
  props: {
    img: {
      default: "https://images.unsplash.com/photo-1560421683-2587f1591d30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    }
  }

});


