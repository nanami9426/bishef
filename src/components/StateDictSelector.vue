<template>
    <div class="camera-selector">
        <label class="lb">
        网络名称：
        <select>
            <option value="pose_net">{{ `pose_net` }}</option>
            <option value="pose_text_cnn">{{ `pose_text_cnn` }}</option>
            <option value="pose_transformer">{{ `pose_transformer` }}</option>
        </select>
        </label>
        <label class="lb">
        参数列表：
        <select>
            <option value="pose_net">{{ `pose_net_2025_05_14_16_33_11.pth` }}</option>
            <option value="pose_text_cnn">{{ `pose_transformer_2025_05_16_14_07_14.pth` }}</option>
            <option value="pose_transformer">{{ `pose_text_cnn_2025_05_16_14_07_41.pth` }}</option>
        </select>
        </label>
      <button>确认</button>
    </div>
  </template>
  
  <script setup>

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


.lb {
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
select {
  border: 1px solid rgba(49, 112, 175, 0.15);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  transition: border-color 0.15s;
  font-family: 'SimSun', '宋体', serif;
}

select:focus {
  outline: none;
}

input:focus {
  outline: none;
}

input[type="checkbox"] {
  width: 14px;
  height: 14px;
  accent-color: rgb(49, 112, 175);
}
  </style>
  