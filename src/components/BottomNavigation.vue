<script setup lang="ts">
import { getViewsList } from '../utilities/helper'
const views = getViewsList()
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <v-bottom-navigation>
    <v-btn value="recent" v-for="view in views" :key="view.name" @click="router.push(view.route)">
      <img :src="view.icon" />
      <span>{{ $t(view.name) }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped></style>
