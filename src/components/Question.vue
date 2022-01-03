<template>
  <div class="question-container">
    <p>{{ question.text }}</p>
    <div class="answers">
      <Answer
        v-for="(answer, i) in question.answers"
        ref="answers"
        :text="answer"
        :correct="i == question.answer"
        :isAnswered="isAnswered"
        :key="i"
        @answered="answered"
      />
    </div>
  </div>
</template>

<style scoped>
.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  width: 500px;
  color: #555;
}

.question-container > p {
  font-weight: 800;
  text-align: center;
  margin: 20px 0;
  font-size: 30px;
}

.answers {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, auto);
}
</style>

<script>
import Answer from '@/components/Answer';

export default {
  props: ['question'],
  components: { Answer },
  data: () => ({
    isAnswered: false,
  }),
  methods: {
    answered(result) {
      this.isAnswered = true;
      this.$emit('answered', result);
    },
    clear() {
      this.isAnswered = false;
      for (let answer of this.$refs.answers) {
        answer.clear();
      }
    },
  }
};
</script>
