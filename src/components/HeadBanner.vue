<template>
    <header class="head-banner">
      <div class="logo">代偿步态检测系统</div>
      <nav class="nav-links">
        <RouterLink
          to="/"
          class="nav-item"
          :class="{ active: currentRoute === '/' }"
        >
          首页
        </RouterLink>
        <RouterLink
          to="/workspace"
          class="nav-item"
          :class="{ active: currentRoute === '/workspace' }"
        >
          工作区
        </RouterLink>
        <RouterLink
          to="/settings"
          class="nav-item"
          :class="{ active: currentRoute === '/settings' }"
        >
          设置
        </RouterLink>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const currentRoute = computed(() => route.path)
  </script>
  
  <style scoped>
  .head-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    font-family: 'SimSun', '宋体', serif;
    font-size: 1.30rem;
    font-weight: bold;
    cursor: default;
    color: #080f18;
  }
  
  .nav-links {
    display: flex;
    gap: 1rem;
  }
  
  .nav-item {
    font-family: 'SimSun', '宋体', serif;
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  
  .nav-item:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #333;
  }
  
  .active {
    background-color: #3170af;
    color: white;
  }
  .active:hover {
    background-color: #3d87d6;
    color: white;
  }
  </style>
  