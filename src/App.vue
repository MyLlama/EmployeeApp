<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500&family=Dosis:wght@700&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'Albert Sans', sans-serif;
}
</style>
