<template>
  <table>
    <tr v-for="(row, i) in field" :key="i">
      <td v-for="(cell, j) in row" :key="j">
        <Cell
          :status="cell.status" :i="i" :j="j"
          @click.native="attack(i, j)"
        />
      </td>
    </tr>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
}
td {
  margin: 0;
  padding: 0;
}
</style>

<script>
import Cell from "@/components/Cell";

export default {
  props: ['width', 'height', 'blockInput'],
  components: { Cell },
  data: () => ({
    field: [],
    loaded: false,
    won: false,
  }),
  methods: {
    attack(x, y) {
      if (
        this.field[x][y].clicked
        || this.won
        || this.blockInput
        || !this.loaded
      )
        return;

      this.field[x][y].clicked = true;

      const [result, killed] = window.attack(x, y);
      this.field[x][y].status = result;

      if (result == 'bomb') {
        this.$emit('bomb');
      }

      if (result != 'miss' && result != 'bomb') {
        this.$emit('hit');
      }

      if (result == 'kill' || result == 'win') {
        for (let [x, y] of killed) {
          this.field[x][y].status = 'kill';
        }
      }

      if (result == 'win')
        this.won = true;
    }
  },
  watch: {
    won(newValue) {
      if (newValue == true) {
        this.$emit('win');
      }
    }
  },
  mounted() {
    document.addEventListener('brythonexecuted', () => {
      let isSuccessful = false;
      while (!isSuccessful) {
        isSuccessful = window.newGame(this.width, this.height);
      }
      this.loaded = true;
    });

    for (let i = 0; i < this.width; i++) {
      this.field.push([]);
      for (let j = 0; j < this.height; j++) {
        this.field[i].push({
          status: 'normal',
          clicked: false,
        });
      }
    }
  },
};
</script>
