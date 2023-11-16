<script setup lang="ts">
import { RouterView } from 'vue-router'
import BottomNavigation from './components/BottomNavigation.vue'
import SideBar from './components/SideBar.vue'
import Header from './components/TheHeader.vue'
import { useAuthStore } from '@/stores/auth'

import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
const authStore = useAuthStore()
</script>

<template>
  <v-app>
    <Header></Header>
    <SideBar v-if="!mobile && authStore.isAuthenticated()" />
    <v-main>
      <RouterView />
    </v-main>
    <bottom-navigation v-if="mobile && authStore.isAuthenticated()" />
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
