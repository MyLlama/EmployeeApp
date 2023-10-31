<script setup lang="ts">
import { getViewsList } from '../utilities/helper'
const views = getViewsList()
</script>

<template>
  <v-bottom-navigation>
    <v-btn value="recent" v-for="view in views" :key="view.name">
      <VsxIcon :iconName="view.icon" :size="20" type="linear" />
      <span>{{ $t(view.name) }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped></style>
