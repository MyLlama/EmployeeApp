<script setup lang="ts">
import { RouterView } from 'vue-router'
import BottomNavigation from './components/BottomNavigation.vue'
import SideBar from './components/SideBar.vue'
import Header from './components/TheHeader.vue'
import { isMobile } from './utilities/helper'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isHomePage = computed(() => route.path === '/home')
</script>

<template>
  <v-app>
    <Header></Header>
    <SideBar v-if="!isMobile() && isHomePage" />
    <v-main>
      <RouterView />
    </v-main>
    <bottom-navigation v-if="isMobile() && isHomePage" />
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
