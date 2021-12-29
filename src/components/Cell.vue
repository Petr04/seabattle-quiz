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
  font-size: 13px;
  color: #0003;
  user-select: none;
  cursor: pointer;
}

.cell:hover {
  box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, .1);
}

.cell.normal {
  background: #ddd;
}

.cell.miss {
  background: #35b0fd;
}

.cell.damage {
  background: #fd9935;
}

.cell.kill {
  background: #fd3c35;
}
</style>

<script>
export default {
  props: ['status', 'i', 'j'],
};
</script>
