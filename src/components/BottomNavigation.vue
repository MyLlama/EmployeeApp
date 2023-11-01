<script setup lang="ts">
import { getViewsList } from '../utilities/helper'
const views = getViewsList()
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <v-bottom-navigation>
    <v-btn value="recent" v-for="view in views" :key="view.name" @click="router.push(view.route)">
      <VsxIcon :iconName="view.icon" :size="20" type="linear" />
      <span>{{ $t(view.name) }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped></style>
