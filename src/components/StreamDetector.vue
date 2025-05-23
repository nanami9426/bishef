<template>
  <div class="stream-container">
    <h2 class="title">视频流</h2>
    <div class="control-panel">
      <button 
        class="button start-button" 
        @click="startStream"
        :disabled="isStreaming"
      >
        开始推流
      </button>
      <button 
        class="button stop-button" 
        @click="stopStream"
        :disabled="!isStreaming"
      >
        停止推流
      </button>
      <div class="status-indicator" :class="statusClass">
        <div class="status-dot"></div>
        {{ statusText }}
      </div>
    </div>
    
    <div v-if="isStreaming" class="video-container">
      <img 
        :src="videoSrc" 
        class="video-feed"
        alt="视频流"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()


const isStreaming = ref(false)

const videoSrc = ref('http://localhost:8000/video_feed')

const statusText = computed(() => 
  isStreaming.value ? '状态: 推流中' : '状态: 已停止'
)

const statusClass = computed(() => ({
  'status-streaming': isStreaming.value,
  'status-stopped': !isStreaming.value
}))

async function checkStreamStatus() {
  try {
    const img = new Image()
    img.onload = () => {
      isStreaming.value = true
      updateVideoSource()
    }
    img.onerror = () => {
      isStreaming.value = false
    }
    img.src = `${videoSrc.value}?t=${new Date().getTime()}`
  } catch (error) {
    console.error('Error checking stream status:', error)
  }
}

async function startStream() {
  if (isStreaming.value) {
    toast('推流已经在进行中')
    return
  }

  try {
    const response = await fetch('http://localhost:8000/func/start_stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (response.ok) {
      isStreaming.value = true
      updateVideoSource()
      // alert('推流已开始')
      toast("推流已开始")

    } else {
      throw new Error('服务器响应错误')
    }
  } catch (error) {
    console.error('Error:', error)
    toast('开始推流失败: ' + error.message)
  }
}

async function stopStream() {
  if (!isStreaming.value) {
    toast('推流已经停止')
    return
  }

  try {
    const response = await fetch('http://localhost:8000/func/stop_stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (response.ok) {
      isStreaming.value = false
      toast("推流已停止")
    } else {
      throw new Error('服务器响应错误')
    }
  } catch (error) {
    console.error('Error:', error)
    toast('停止推流失败: ' + error.message)
  }
}

function updateVideoSource() {
  videoSrc.value = `http://localhost:8000/video_feed?t=${new Date().getTime()}`
}

onMounted(() => {
  checkStreamStatus()
  console.log("checkStreamStatus ok");
})
onBeforeRouteLeave((to, from, next) => {
  if(!isStreaming.value){
    next()
    return
  }
  const answer = window.confirm('离开页面后将自动停止推流')
  if (answer) {
    next() // 允许路由跳转
    stopStream()
    console.log("stream stopped");
  } else {
    next(false) // 阻止路由跳转
  }
})
</script>

<style scoped>
.stream-container {
  /* border:1px solid; */
  max-width: 640px;
  margin: 20px auto;
  padding: 20px;
  font-family: 'SimSun', '宋体', serif;
}

.title {
  font-size: 20px;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 24px;
}

.control-panel {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  /* background: rgb(249, 249, 249); */
  border-radius: 4px;
}

.button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: 'SimSun', '宋体', serif;
}

.button:hover {
  transform: translateY(-1px);
}

.start-button {
  background-color: #4CAF50;
  color: white;
}

.start-button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.stop-button {
  background-color: #f44336;
  color: white;
}

.stop-button:disabled {
  background-color: #ef9a9a;
  cursor: not-allowed;
}

.status-indicator {
  /* border: 1px solid; */
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  /* border-radius: 20px; */
  font-size: 14px;
  cursor: default;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-streaming {
  /* background-color: #e8f5e9; */
  color: #2e7d32;
}

.status-streaming .status-dot {
  background-color: #4CAF50;
}

.status-stopped {
  /* background-color: #ffebee; */
  color: #c62828;
}

.status-stopped .status-dot {
  background-color: #f44336;
}

.video-container {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.video-feed {
  display: block;
  width: 100%;
  height: auto;
}

</style>