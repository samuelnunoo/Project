<template>
<button :style="buttonStyles" @click="onClick">
  <img src="https://images.unsplash.com/photo-1560421683-2587f1591d30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
    <slot></slot>
</button>

</template>

<script>
export default {
  name: 'my-button',

  data() {
    return {
      buttonStyles: {
        border: '1px solid #eee',
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
        fontSize: 15,
        padding: '3px 10px',
        margin: 10,
      },
    };
  },

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>