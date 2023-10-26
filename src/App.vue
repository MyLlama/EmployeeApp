<script setup lang="ts">
import { RouterView } from 'vue-router'
import BottomNavigation from './components/BottomNavigation.vue'
import SideBar from './components/SideBar.vue'
import Header from './components/TheHeader.vue'
import { isMobile } from './utilities/helper'
</script>

<template>
  <v-app>
    <Header></Header>
    <SideBar v-if="!isMobile()" />
    <bottom-navigation v-if="isMobile()" />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
