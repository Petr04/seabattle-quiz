<template>
  <img ref="img" :src="src">
</template>

<style scoped>
img {
  display: block;
  max-height: 300px;
  width: calc(100% - 2 * 15px);
  border-radius: 3px;
}
</style>

<script>
import gifs from '@/assets/gifUrls';

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

export default {
  props: ['result'],
  data() {
    return {
      src: choose( gifs[this.result] ),
    };
  },
  methods: {
    update() {
      this.$refs.img.src = choose( gifs[this.result] );
    },
  },
};
</script>
