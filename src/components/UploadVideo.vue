<template>
    <div class="upload-form">
      <form @submit.prevent="submitForm">
        <div>
          <label for="video-upload" class="custom-file-upload">选择视频</label>
          <input id="video-upload" type="file" accept="video/*" @change="handleFileChange" />
        </div>
  
        <!-- 视频预览 -->
        <div v-if="previewUrl" class="preview">
          <p style="margin-bottom: 7px;">预览</p>
          
          <video :src="previewUrl" controls width="100%" />
        </div>

        <button type="submit">上传</button>
      </form>
  
      <div v-if="response">
        <div style="font-size: 16px; margin-bottom: 17px;">识别结果：</div>
        <pre>{{ response }}</pre>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const file = ref(null)
  const previewUrl = ref(null)
  const response = ref(null)
  
  const handleFileChange = (event) => {
    const selected = event.target.files[0]
    if (selected) {
      file.value = selected
      previewUrl.value = URL.createObjectURL(selected)
    }
  }
  
  const submitForm = async () => {
    if (!file.value) {
      alert('请上传视频并填写文字')
      return
    }
  
    const formData = new FormData()
    formData.append('file', file.value)
    formData.append('file_type', 'video')
  
    try {
      const res = await axios.post('http://127.0.0.1:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      response.value = res.data
    } catch (error) {
      response.value = error.response?.data || error.message
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
  .preview {
    margin: 20px 0;
    }
  video {
    max-width: 720px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  </style>
  