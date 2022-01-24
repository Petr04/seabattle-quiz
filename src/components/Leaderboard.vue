<template>
  <div class="leaderboard">
    <Team
      v-for="team, i in teams"
      :key="i"
      :team="team"
      :active="i == active"
      @del="teams.splice(i, 1)"
    />
    <div class="button add" @click="addTeam">
      <mdicon name="plus" />
    </div>
  </div>
</template>

<style scoped>
.leaderboard {
  --team-spacing: 10px;

  display: flex;
  align-items: center;

  padding: var(--team-spacing);
}

.leaderboard > * {
  margin: 0 5px;
}

.add:hover svg {
  background: var(--light-grey);
}

.add:active svg {
  background: var(--grey);
}
</style>

<script>
import Team from '@/components/Team';

export default {
  components: { Team },
  data: () => ({
    teams: [{
      name: '',
      score: 0,
    }],
    active: 0,
  }),
  methods: {
    addTeam() {
      this.teams.push({
        name: '',
        score: 0,
      });
    },
    change(f) {
      this.teams[this.active].score = f(this.teams[this.active].score);
    },
    next() {
      this.active = (this.active + 1) % this.teams.length;
    },
  },
};
</script>
