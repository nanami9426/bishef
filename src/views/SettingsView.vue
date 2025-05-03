<script setup>
import CameraSelector from '@/components/CameraSelector.vue';


</script>

<template>
    <div style="height: 27px;"></div>
    <div class="title">选择推流摄像头</div>
    <CameraSelector></CameraSelector>
</template>

<style scoped>
.title {
    color: #2c3e50;
    font-family: 'SimSun', '宋体', serif;
    font-size: 20px;
    font-weight: bold;
    max-width: 1220px;
    margin: 0 auto;
}
</style>

