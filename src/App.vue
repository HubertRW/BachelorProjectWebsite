<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <RouterLink class="wordmark" to="/" aria-label="Group name home">
        <span class="wordmark-mark">G</span>
        <span>GROUP NAME</span>
      </RouterLink>

      <nav class="site-nav" aria-label="Main navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About us</RouterLink>
      </nav>
    </header>

    <RouterView />

    <footer class="site-footer">
      <div>
        <strong>GROUP NAME</strong>
        <p>Six engineering students. One shared direction.</p>
      </div>
      <div class="footer-meta">
        <span>University of South-Eastern Norway</span>
        <span>Bachelor Project</span>
      </div>
    </footer>
  </div>
</template>
