<template>
  <div :class="`cell ${status}`">
    {{ 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i] }}{{ j+1 }}
  </div>
</template>

<style scoped>
.cell {
  --size: 40px;
  width: var(--size);
  height: var(--size);
  border-radius: 3px;
  padding: 4px;
  margin: var(--spacing);
  font-size: 13px;
  color: #0003;
  user-select: none;
  cursor: pointer;
}

.cell:hover {
  box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, .1);
}

.cell.normal {
  background: var(--grey);
}

.cell.miss {
  background: var(--blue);
}

.cell.damage {
  background: var(--orange);
}

.cell.kill {
  background: var(--red);
}

.cell.bomb {
  background: #444;
  color: #ccc;
}
</style>

<script>
export default {
  props: ['status', 'i', 'j'],
};
</script>
