<template>
    <div class="info-box">
      <div class="links">
        <a href="#" class="link" @click="box_info=instruction">使用说明</a>
        <span class="separator"> / </span>
        <a href="https://github.com/nanami9426/Compensatory-gait-recognition" class="link" target="_blank">GitHub</a>
        <span class="separator"> / </span>
        <a href="#" class="link" @click="box_info=about">关于</a>
      </div>
      <div class="text" v-html="box_info">
      </div>
    </div>
  </template>
  
<script setup>
import {ref} from 'vue'
const instruction = `
        你打开的是康复动作代偿评测系统的前端页面。<br />
        开始推流后，左上角出现红色“OCCURRING”则代表被监测主体出现了代偿步态，出现绿色“FINE”则代表步态正常。<br />
        其他实现的功能请前往工作区。(╯‵□′)╯︵┴─┴
        `
const about = `
        作者：张文帅<br />
        学号：20210440423<br />
        班级：数据2102班<br />
        邮箱：1156592100@qq.com
        `
const box_info = ref()
box_info.value = instruction
</script>
  
  <style scoped>
  .info-box {
    font-family: 'SimSun', '宋体', serif;
    background-color: #f9f9f9;
    padding: 16px;
    border-radius: 4px;
    line-height: 1.8;
    color: #222;
    font-size: 14px;
    max-width: 640px;
    margin: 20px auto;
    border-radius: 4px;
  }
  
  .links {
    margin-bottom: 10px;
  }
  
  .link {
    color: rgb(49, 112, 175);
    text-decoration: none;
  }
  
  .separator {
    margin: 0 5px;
    cursor: default;
    color: #222;
  }
  </style>
  