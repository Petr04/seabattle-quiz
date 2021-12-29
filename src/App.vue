<template>
  <div id="app">
    <canvas id="confetti"></canvas>
    <Field
      :width="8" :height="8"
      @win="confetti.addConfetti(confettiParams)"
    />
  </div>
</template>

<style>
body {
  margin: 0;
}

#app {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
</style>

<script>
import Field from "./components/Field";
import JSConfetti from 'js-confetti';

export default {
  name: "App",
  components: {
    Field,
  },
  data: () => ({
    confetti: new JSConfetti(),
    confettiParams: {

    },
  }),
};
</script>
