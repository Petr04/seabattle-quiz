<template>
  <div class="question-container">
    <p
      v-html="question.text"
      :class="{ 'long-text': stripHtml(question.text).length > 70 }"
    ></p>
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
  width: 500px;
  color: #555;
}

.question-container > p {
  font-weight: 800;
  text-align: center;
  margin: 20px 0;
  font-size: 30px;
}

.question-container > p.long-text {
  font-weight: normal;
  text-align: start;
  font-size: 24px;
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
    stripHtml(html) {
      const tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    },
  },
};
</script>
