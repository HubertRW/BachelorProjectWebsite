<script setup lang="ts">
defineProps<{
  number: string
  name: string
  discipline: string
  focus: string
}>()
</script>

<template>
  <article class="student-card">
    <div class="portrait-placeholder">
      <span>IMAGE HERE</span>
      <small>PORTRAIT {{ number }}</small>
    </div>
    <div class="student-details">
      <span class="student-number">{{ number }}</span>
      <div>
        <h2>{{ name }}</h2>
        <p>{{ discipline }}</p>
        <span>{{ focus }}</span>
      </div>
    </div>
  </article>
</template>
