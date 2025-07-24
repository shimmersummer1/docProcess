<template>
  <div class="pdf-merge-container">
    <h2>PDF合并工具</h2>
    <el-upload
      class="upload-box"
      drag
      multiple
      :limit="10"
      :on-change="handleFileChange"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :auto-upload="false"
      accept="application/pdf"
      :show-file-list="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">拖拽或点击上传PDF文件</div>
      <div class="el-upload__tip">最多10个文件，仅支持PDF</div>
    </el-upload>
    <el-scrollbar class="file-list-scroll">
      <div v-for="(file, idx) in fileList" :key="file.uid" class="file-item" draggable="true"
        @dragstart="onDragStart(idx)" @dragover.prevent @drop="onDrop(idx)"
        @mouseenter="hoverIdx = idx" @mouseleave="hoverIdx = -1"
      >
        <el-card shadow="hover" class="file-card">
          <div class="file-info">
            <span class="file-name">{{ file.name }}</span>
            <el-button
              v-show="hoverIdx === idx"
              class="delete-btn"
              size="small"
              circle
              @click="removeFile(idx)"
            >
              <template #icon>
                <el-icon><Delete /></el-icon>
              </template>
            </el-button>
          </div>
        </el-card>
      </div>
    </el-scrollbar>
    <div class="actions">
      <el-button type="primary" :loading="merging" :disabled="fileList.length < 2" @click="mergePdf">开始合并</el-button>
      <el-button v-if="downloadUrl" type="success" @click="downloadMerged">下载合并文件</el-button>
    </div>
    <el-dialog v-model="dialogVisible" title="提示" width="300px">
      <span>{{ dialogMsg }}</span>
      <template #footer>
        <el-button @click="dialogVisible = false">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { Delete } from '@element-plus/icons-vue';

const fileList = ref([]);
const hoverIdx = ref(-1);
const merging = ref(false);
const downloadUrl = ref('');
const dialogVisible = ref(false);
const dialogMsg = ref('');
let dragIdx = null;
const backendUrl = window.BACKEND_URL ;

function beforeUpload(file) {
  if (file.type !== 'application/pdf') {
    showDialog('只能上传PDF文件');
    return false;
  }
  return true;
}

function handleFileChange(file, files) {
  // files: 当前所有文件
  fileList.value = files.map(f => f.raw ? f.raw : f);
}

function removeFile(idx) {
  fileList.value.splice(idx, 1);
}

function onDragStart(idx) {
  dragIdx = idx;
}
function onDrop(idx) {
  if (dragIdx === null || dragIdx === idx) return;
  const moved = fileList.value.splice(dragIdx, 1)[0];
  fileList.value.splice(idx, 0, moved);
  dragIdx = null;
}

function showDialog(msg) {
  dialogMsg.value = msg;
  dialogVisible.value = true;
}

async function mergePdf() {
  if (fileList.value.length < 2) {
    showDialog('请至少选择两个PDF文件');
    return;
  }
  merging.value = true;
  try {
    const formData = new FormData();
    fileList.value.forEach(f => formData.append('files', f));
    const res = await axios.post(`${backendUrl}/merge`, formData, {
      responseType: 'blob'
    })
    if (!res.data) throw new Error('合并失败');
    const blob = res.data;
    downloadUrl.value = URL.createObjectURL(blob);
    showDialog('合并成功，可下载文件');
  } catch (e) {
    showDialog('合并失败，请重试');
  } finally {
    merging.value = false;
  }
}

function downloadMerged() {
  const a = document.createElement('a');
  a.href = downloadUrl.value;
  a.download = 'merged.pdf';
  a.click();
}
</script>

<style scoped>
.pdf-merge-container {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 32px 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px #e0e0e0;
}
.upload-box {
  margin-bottom: 18px;
}
.file-list-scroll {
  
  margin-bottom: 18px;
}
.file-item {
  margin-bottom: 10px;
  cursor: grab;
}
.file-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}
.file-info {
  display: flex;
  align-items: center;
  width: 100%;
}
.file-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.delete-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0;
}
.actions {
  margin-top: 18px;
  display: flex;
  gap: 12px;
}
</style> 