<template>
    <div class="camera-selector">
      <span>摄像头类型：</span>
  
      <label class="radio-option">
        <input type="radio" value="default" v-model="cameraType" />
        默认
      </label>
  
      <label class="radio-option">
        <input type="radio" value="remote" v-model="cameraType" />
        远程
      </label>
  
      <input
        v-if="cameraType === 'remote'"
        type="text"
        v-model="remoteIp"
        placeholder="输入摄像头IP地址"
        class="ip-input"
      />
  
      <button @click="confirmSelection">确认</button>

      <label class="radio-option">当前摄像头为{{ current_cup }}</label>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useToast } from 'vue-toastification'

const toast = useToast()
  const cameraType = ref('default')
  const remoteIp = ref('')
  const submitted = ref(false)
  const current_cup = ref("")
  
  const confirmSelection=()=> {
    submitted.value = true
    if (cameraType.value === 'remote' && !remoteIp.value) {
      alert('请输入远程摄像头的 IP 地址')
    } else {
      // 可触发 emit 或调用 API
      console.log('选择结果：', {
        type: cameraType.value,
        ip: remoteIp.value
      })
    }
  }

  const get_current_cap = async ()=>{
    try{
        const res = await axios.post('http://localhost:8000/status')
        current_cup.value = res.data.cap
    } catch(err){
        console.log(err);
        
        toast(err.message)
    }
  }
  onMounted(()=>{
    get_current_cap()
  })
  </script>
  
  <style scoped>
  .camera-selector {
    font-size: 14px;
    color: #222;
    display: flex;
    align-items: center;
    gap: 15px;
    font-family: 'SimSun', '宋体', serif;
    max-width: 1220px;
    margin: 20px auto;
  }
  
  .radio-option {
    display: flex;
    align-items: center;
    gap: 15px;
    accent-color: rgb(49, 112, 175);
  }
  
.ip-input {
    border: 1px solid rgba(49, 112, 175, 0.15);
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 14px;
    transition: border-color 0.15s;
    font-family: 'SimSun', '宋体', serif;
}

.ip-input:focus {
  outline: none;
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

  </style>
  