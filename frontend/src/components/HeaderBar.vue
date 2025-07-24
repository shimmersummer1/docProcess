<template>
  <el-row class="header-bar" align="middle" justify="start">
    <el-col :span="24" style="display: flex; align-items: center;">
      <div class="brand">MIMI</div>
      <button class="pdf-action-btn" @click="$emit('toggle-menu')">PDF操作</button>
    </el-col>
  </el-row>
</template>

<script setup>
</script>

<style scoped>
.header-bar {
  height: 64px;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  padding: 0 32px;
}
.brand {
  font-size: 2.2rem;
  font-family: 'FZShuTi', 'STXingkai', cursive, sans-serif;
  font-weight: bold;
  letter-spacing: 2px;
  color: #d4af37;
  line-height: 64px;
  margin-right: 24px;
}
.pdf-action-btn {
  border: none;
  background: transparent;
  color: #303133;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 0 12px;
  height: 40px;
  line-height: 40px;
  transition: background 0.2s;
  margin-left: 40px;
}
.pdf-action-btn:hover {
  background: #f5f7fa;
  color: #303133;
  text-decoration: none;
}
.file-list-scroll {
  height: 220px;           /* 固定高度 */
  margin-bottom: 18px;
  overflow: hidden;        /* 防止外溢 */
}
.file-list-scroll .el-scrollbar {
  height: 100%;            /* 让 el-scrollbar 填满容器 */
}
.file-list-scroll .el-scrollbar__wrap {
  max-height: 100% !important; /* 让内容区也填满 */
}
</style> 