<template>
  <div :class="{ team: true, active }">
    <input
      type="text"
      ref="input"
      :value="team.name"
      class="input"
      :style="{ width: minWidth + 'px' }"
      contenteditable
      spellcheck="false"
    >
    <span> &mdash; {{ team.score }}</span>
    <div class="button close" @click="$emit('del')">
      <mdicon name="close" width="18" height="18" />
    </div>
  </div>
</template>

<style scoped>
.team {
  position: relative;
  background: var(--light-grey);
  border-radius: 10px;
  padding: 15px;
  transition: .3s;
}

.team, .team .input {
  color: #000a;
  font-size: 20px;
}

.team.active, .team.active .input {
  color: var(--light-grey);
  background: #333;
}

.team.active .input {
  border-bottom: 1px solid #aaa;
}

.input {
  display: inline-block;
  border: none;
  border-bottom: 1px solid #0003;
  background: inherit;
  font-size: 20px;
}

.input:focus {
  outline: none;
}

.close {
  position: absolute;

  right: calc(var(--team-spacing) * -1);
  top: calc(var(--team-spacing) * -1);

  opacity: 0;
}

.close svg {
  fill: var(--light-grey);
  background: #444;
}

.team:hover .close {
  opacity: 1;
}
</style>

<script>
export default {
  props: ['team', 'active'],
  data: () => ({
    minWidth: 100,
    maxWidth: 400,
  }),
  methods: {
    getTextWidth(text) {
      const tmp = document.createElement('div');
      tmp.style['font-size'] = '20px';
      tmp.style['font-family'] = `"Roboto", sans-serif`;
      tmp.style['white-space'] = 'pre';
      tmp.innerText = text;

      const parent = document.getElementById('app');
      parent.appendChild(tmp);
      const width = tmp.offsetWidth;
      parent.removeChild(tmp);

      return width;
    },
    adjustInput() {
      this.$refs.input.style.width = Math.max(
        this.minWidth,
        Math.min(this.maxWidth, this.getTextWidth(this.$refs.input.value))
      ) + 'px';
    },
  },
  mounted() {
    // adjust input
    this.adjustInput(); // when mounted
    window.addEventListener('load', () => { // when font loaded
      this.adjustInput();
    });
    this.$refs.input.addEventListener('input', this.adjustInput); // when edited
  },
};
</script>
