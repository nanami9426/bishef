<template>
    <div class="upload-form">
      <form @submit.prevent="submitForm">
        <div>
          <label for="pic-upload" class="custom-file-upload">选择图片</label>
          <input id="pic-upload" type="file" accept="image/*" @change="handleFileChange" />
        </div>
  
        <!-- 图片预览 -->
        <div v-if="previewUrl" class="preview">
            <p style="margin-bottom: 7px;">预览</p>

          <img :src="previewUrl" alt="预览图" />
        </div>
        <button type="submit"  :disabled="running">{{ running ? '处理中...' : '上传' }}</button>
      </form>
      <div v-show="response">
        <button @click="clear" >清空结果</button>
      </div>
      
      <div v-if="response">
        <div style="font-size: 16px; margin-bottom: 17px;">识别结果：</div>
        <!-- <div class="response"> {{ response }}</div> -->
         <div v-html="mark_res"  class="response"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import axios from 'axios'
  import { marked } from 'marked'
  const file = ref(null)
  const response = ref(null)
  const previewUrl = ref(null)
  const running = ref(false)

  const mark_res = computed(()=>marked(response.value))

  const handleFileChange = (event) => {
    const selected = event.target.files[0]
    if (selected) {
      file.value = selected
      previewUrl.value = URL.createObjectURL(selected)
    }
  }
  const clear = ()=>{
    response.value = null
  }
  const submitForm = async () => {
    if (running.value) return
    if (!file.value) {
      alert('请上传图片')
      return
    }
    running.value = true
    
    const formData = new FormData()
    formData.append('file', file.value)
    formData.append('file_type', 'pic')
  
    try {
      const res = await axios.post('http://127.0.0.1:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      response.value = res.data
    } catch (error) {
      response.value = error.response?.data || error.message
    } finally {
      running.value = false
    }
  }
  </script>
  
  <style scoped>
  .upload-form {
    color: #222;
    display: flex;
    font-size: 14px;
    flex-direction: column;
    gap: 20px;
    max-width: 1220px;
    margin: 20px auto;
    font-family: 'SimSun', '宋体', serif;
  }
  .upload-form textarea {
    width: 100%;
    margin-top: 10px;
    border: 1px solid rgba(49, 112, 175, 0.15);
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 14px;
    transition: border-color 0.15s;
    font-family: 'SimSun', '宋体', serif;
  }
  .upload-form textarea:focus {
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
    margin-top: 17px;
}

button:hover:not(:disabled) {
    transform: translateY(-1px);
}
button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}
  .preview {
    margin: 20px 0;
  }
  .preview img {
    max-width: 100%;
    max-height: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-width: 720px;
  }

  .custom-file-upload {
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
  input[type="file"] {
    display: none;
  }
  .response {
    max-width: 1220px;
  }
  </style>
  