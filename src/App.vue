<template>
  <div id="app">
    <canvas id="confetti"></canvas>
    <div class="container">
      <Field
        :width="8" :height="8"
        :blockInput="!isAnswered"
        @win="confetti.addConfetti(confettiParams)"
        @hit="newQuestion"
      />
      <transition name="fade">
        <Question
          v-if="questionAppeared"
          ref="question"
          :question="question"
          @answered="onAnswer"
        />
      </transition>
    </div>
  </div>
</template>

<style>
:root {
  --red: #fd3c35;
  --orange: #fd9935;
  --blue: #35b0fd;
  --grey: #ddd;
  --green: #35fd56;

  --spacing: 2px;
}

body {
  margin: 0;
}

#app {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#confetti {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 100%;
  right: 100%;
}

.container {
  display: flex;
}

.fade-enter-active {
  transition: opacity .5s;
}

.fade-enter {
  opacity: 0;
}
</style>

<script>
import Field from '@/components/Field';
import Question from '@/components/Question';
import JSConfetti from 'js-confetti';

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default {
  name: "App",
  components: {
    Field,
    Question,
  },
  data: () => ({
    confetti: new JSConfetti(),
    confettiParams: {

    },
    questionAppeared: false,
    isAnswered: true,
    question: null,
    questionNumber: 0,
    questions: shuffle([
      {
        text: 'Первый вопрос',
        answers: [
          'Первый ответ',
          'Второй ответ',
          'Третий ответ',
          'Четвёртый ответ',
        ],
        answer: 1,
      },
      {
        text: 'Второй вопрос',
        answers: [
          'Первый ответ',
          'Второй ответ',
          'Третий ответ',
          'Четвёртый ответ',
        ],
        answer: 3,
      }
    ])
  }),
  methods: {
    onAnswer() {
      this.isAnswered = true;
    },
    newQuestion() {
      if (this.questionAppeared)
        this.$refs.question.clear();

      this.isAnswered = false;
      this.question =
        this.questions[this.questionNumber % this.questions.length];
      this.questionNumber++;
    }
  },
  watch: {
    question(newValue, oldValue) {
      if (oldValue == null) {
        this.questionAppeared = true;
      }
    },
  }
};
</script>
