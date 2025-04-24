<template>
    <div class="stream-container">
      <h2 class="title">视频流</h2>
      <div class="controls">
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
        <div :class="['status', statusClass]">
          状态: {{ statusText }}
        </div>
      </div>
      <div class="video-container">
        <img 
          v-if="isStreaming"
          id="video-feed"
          :src="videoSrc"
          alt="视频流"
          class="video-feed"
        >
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isStreaming: false,
        statusText: '未开始',
        videoSrc: 'http://localhost:8000/video_feed',
        statusClass: 'status-stopped'
      }
    },
    mounted() {
      this.checkStreamStatus()
    },
    methods: {
      async startStream() {
        if (this.isStreaming) {
          alert('推流已经在进行中')
          return
        }
  
        try {
          const response = await fetch('http://localhost:8000/func/start_stream', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          
          if (response.ok) {
            this.isStreaming = true
            this.updateStatus('推流中', 'status-streaming')
            this.videoSrc = `${this.videoSrc}?t=${Date.now()}`
            alert('推流已开始')
          } else {
            throw new Error('服务器响应错误')
          }
        } catch (error) {
          console.error('Error:', error)
          alert('开始推流失败: ' + error.message)
        }
      },
  
      async stopStream() {
        if (!this.isStreaming) {
          alert('推流已经停止')
          return
        }
  
        try {
          const response = await fetch('http://localhost:8000/func/stop_stream', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          
          if (response.ok) {
            this.isStreaming = false
            this.updateStatus('已停止', 'status-stopped')
            alert('推流已停止')
          } else {
            throw new Error('服务器响应错误')
          }
        } catch (error) {
          console.error('Error:', error)
          alert('停止推流失败: ' + error.message)
        }
      },
  
      updateStatus(text, className) {
        this.statusText = text
        this.statusClass = className
      },
  
      checkStreamStatus() {
        const img = new Image()
        img.onload = () => {
          this.isStreaming = true
          this.updateStatus('推流中', 'status-streaming')
        }
        img.onerror = () => {
          this.isStreaming = false
          this.updateStatus('已停止', 'status-stopped')
        }
        img.src = `${this.videoSrc}?t=${Date.now()}`
      }
    }
  }
  </script>
  
  <style scoped>
  .stream-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .title {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .controls {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
  }
  
  .button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .start-button {
    background-color: #4CAF50;
    color: white;
  }
  
  .start-button:not(:disabled):hover {
    background-color: #45a049;
  }
  
  .stop-button {
    background-color: #f44336;
    color: white;
  }
  
  .stop-button:not(:disabled):hover {
    background-color: #da190b;
  }
  
  .status {
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
  }
  
  .status-streaming {
    background-color: #4CAF50;
    color: white;
  }
  
  .status-stopped {
    background-color: #f44336;
    color: white;
  }
  
  .video-container {
    border: 2px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background: #f8f9fa;
    display: flex;
    justify-content: center;
  }
  
  .video-feed {
    max-width: 100%;
    height: auto;
    display: block;
  }
  </style>