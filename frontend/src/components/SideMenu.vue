<template>
  <el-menu default-active="pdf-merge" class="side-menu" @select="onSelect">
    <el-menu-item index="pdf-merge">PDF合并</el-menu-item>
  </el-menu>
</template>

<script setup>
const emit = defineEmits(['select']);
function onSelect(index) {
  emit('select', index);
}
</script>

<style scoped>
.side-menu {
  width: 180px;
  min-width: 120px;
  height: 100vh;
  border-right: 1px solid #ebeef5;
  background: #fff;
}
</style> 