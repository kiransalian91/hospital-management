<template>
  <div class="app">
    <h1>Hospital Management System</h1>
    <div class="container">
      <div v-for="node of data">
        <div>{{ node.name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import json from './data.json'
const data = ref(json)
</script>
<style></style>
