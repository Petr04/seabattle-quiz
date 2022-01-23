<template>
  <div id="app">
    <canvas id="confetti"></canvas>
    <Leaderboard ref="leaderboard" />
    <div class="container">
      <Field
        :width="8" :height="8"
        :blockInput="!isAnswered"
        @miss="showQuestion = false"
        @win="confetti.addConfetti(confettiParams)"
        @hit="() => {last = 'hit'; newQuestion()}"
        @bomb="() => {last = 'bomb'; newQuestion()}"
      />
      <!-- <SlideXRightTransition> -->
        <div
          v-if="question"
          v-show="showQuestion"
          class="question-gif-container"
        >
          <Question
            ref="question"
            :question="question"
            @answered="onAnswer"
          />
          <Gif v-if="result" ref="gif" :result="result" />
        </div>
      <!-- </SlideXRightTransition> -->
    </div>
  </div>
</template>

<style>
:root {
  --red: #fd3c35;
  --orange: #fd9935;
  --blue: #35b0fd;
  --green: #35fd56;
  --grey: #ddd;
  --light-grey: #efefef;

  --spacing: 2px;
}

body {
  margin: 0;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

input {
  font-family: "Roboto", sans-serif;
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
  align-items: center;
  height: 100%;
}

.question-gif-container {
  display: flex;
  flex-direction: column;
  width: min-content;
}

.container > *, .question-gif-container > * {
  margin: 15px;
}

.mdi svg {
  fill: #000a;
}

.button {
  cursor: pointer;
  transition: .3s;
}

.button svg {
  padding: 2px;
  transition: .3s;
  border-radius: 100%;
}

.button .mdi {
  height: 3;
}

code {
  font-family: "Fira Code", sans-serif;
  background: var(--grey);
  padding: 0 6px;
  margin: 3px;
  border-radius: 3px;
}

.hidden {
  display: none !important;
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
import Gif from '@/components/Gif';
import Leaderboard from '@/components/Leaderboard';
import JSConfetti from 'js-confetti';
import questions from '@/assets/questions';
// import { SlideXRightTransition } from 'vue2-transitions';

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
    Gif,
    Leaderboard,
    // SlideXRightTransition,
  },
  data: () => ({
    confetti: new JSConfetti(),
    confettiParams: {

    },
    showQuestion: false,
    isAnswered: true,
    result: null,
    last: null,
    question: false,
    questionNumber: 0,
    questions: shuffle(questions),
  }),
  methods: {
    onAnswer(result) {
      this.isAnswered = true;
      this.result = result;

      if (result == 'correct' && this.last == 'hit') {
        this.$refs.leaderboard.change(x => x + 1);
      } else if (result == 'wrong' && this.last == 'bomb') {
        this.$refs.leaderboard.change(x => x - 1);
      } else {
        this.$refs.leaderboard.change(x => x);
      }
    },
    newQuestion() {
      this.result = null;
      this.showQuestion = true;
      if (this.$refs.question)
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
        this.showQuestion = true;
      }
    },
  }
};
</script>
