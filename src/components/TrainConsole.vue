<template>
<div class="train-terminal">
    <div class="controls">
    <label>
        网络名称：
        <input type="text" v-model="params.net_name" />
    </label>
    <label>
        批量大小：
        <input type="number" v-model.number="params.batch_size" min="1" />
    </label>
    <label>
        训练轮次：
        <input type="number" v-model.number="params.num_epochs" min="1" />
    </label>
    <label>
        是否添加测试：
        <input type="checkbox" v-model="params.evaluate_test" />
    </label>
    <div style="width: 27px;"></div>
    <button :disabled="running" @click="startTrain">
        {{ running ? '训练中...' : '开始训练' }}
    </button>
    <button :disabled="running" @click="clearConsole">
        {{ "清空" }}
    </button>
    </div>

    <div class="cmd-window" ref="cmdWindow">
    <pre v-for="(line, idx) in logs" :key="idx">{{ line }}</pre>
    </div>
</div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'

const params = reactive({
batch_size: 32,
net_name: 'pnet',
num_epochs: 16,
evaluate_test: false
})

const logs = ref([])
const running = ref(false)
const cmdWindow = ref(null)

const clearConsole = ()=>{
  logs.value = []
}

async function startTrain() {
  if (running.value) return
  // logs.value = []
  running.value = true

  try {
        const res = await fetch('http://localhost:8000/func/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
        })
        if (!res.ok || !res.body) {
        logs.value.push('Error: 无法连接到训练接口')
        return
        }

        const reader = res.body
        .pipeThrough(new TextDecoderStream())
        .getReader()

        let { value, done } = await reader.read()
        let buffer = ''
        while (!done) {
        buffer += value
        let lines = buffer.split(/\r?\n/)
        buffer = lines.pop()  // 最后一项可能不完整，保留到下轮
        for (const line of lines) {
            logs.value.push(line)
            await nextTick()
            // 自动滚动到底部
            const el = cmdWindow.value
            if (el) {
            el.scrollTop = el.scrollHeight
            }
        }
        ({ value, done } = await reader.read())
        }
        // 处理最后残余
        if (buffer.trim()) {
        logs.value.push(buffer.trim())
        }
    } catch (err) {
        logs.value.push(`Exception: ${err.message}`)
    } finally {
        running.value = false
  }
}
</script>

<style scoped>
.train-terminal {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1220px;
  margin: 20px auto;
  font-family: 'SimSun', '宋体', serif;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #222;
}

input {
  border: 1px solid rgba(49, 112, 175, 0.15);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  transition: border-color 0.15s;
  font-family: 'SimSun', '宋体', serif;
}

input:focus {
  outline: none;
}

input[type="checkbox"] {
  width: 14px;
  height: 14px;
  accent-color: rgb(49, 112, 175);
}

button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    font-family: 'SimSun', '宋体', serif;
    background-color: #4CAF50;
    color: white;
}

button:hover:not(:disabled) {
    transform: translateY(-1px);
}

button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.cmd-window {
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 12px;
  background-color: #1e1e1e;
  color: #d4d4d4;
  height: 300px;
  overflow-y: auto;
  font-family: 'SimSun', '宋体', serif;
  font-size: 13px;
}

.cmd-window pre {
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
}

/* 滚动条样式 */
.cmd-window::-webkit-scrollbar {
  width: 6px;
}

.cmd-window::-webkit-scrollbar-track {
  background: #2d2d2d;
}

.cmd-window::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 4px;
}

.cmd-window::-webkit-scrollbar-thumb:hover {
  background: #888;
}
</style>