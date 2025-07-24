<template>
  <div class="app-container">
    <HeaderBar @toggle-menu="showMenu = !showMenu" />
    <div class="main-layout">
      <SideMenu v-if="showMenu" @select="onMenuSelect" />
      <div class="main-content">
        <PdfMerge v-if="activeMenu === 'pdf-merge'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderBar from './components/HeaderBar.vue';
import SideMenu from './components/SideMenu.vue';
import PdfMerge from './components/PdfMerge.vue';

const showMenu = ref(false);
const activeMenu = ref('pdf-merge');

function onMenuSelect(menu) {
  activeMenu.value = menu;
}
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-layout {
  display: flex;
  flex: 1;
  min-height: 0;
}
.main-content {
  flex: 1;
  padding: 24px;
  background: #f5f7fa;
  min-width: 0;
}
</style> 