<template>
  <div
    :class="`answer ${status}`"
    @click="check"
  >
    {{ text }}
  </div>
</template>

<style scoped>
.answer {
  padding: 10px;
  margin: var(--spacing);
  cursor: pointer;
  border-radius: 3px;
  color: #0007;
}

.answer:hover {
  box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, .1);
}

.answer.normal {
  background: var(--grey);
}

.answer.wrong {
  background: var(--red);
}

.answer.correct {
  background: var(--green);
}
</style>

<script>
export default {
  props: ['text', 'correct', 'isAnswered'],
  data: () => ({
    status: 'normal',
  }),
  methods: {
    check() {
      if (this.isAnswered)
        return;

      if (this.correct) {
        this.status = 'correct';
      } else {
        this.status = 'wrong';
      }

      this.$emit('answered', this.status);
    },
    clear() {
      this.status = 'normal';
    }
  }
};
</script>
