<script setup lang="ts">
import llamaLogo from './assets/logo.svg'
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-toolbar class="navigation">
      <v-toolbar-side-icon>
        <v-img :src="llamaLogo" height="30px" width="40px"> </v-img>
      </v-toolbar-side-icon>
      <v-toolbar-title class="title d-flex justify-center mr-8">MyLlama</v-toolbar-title>
    </v-toolbar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
