<script setup lang="ts">
import { getViewsList } from '../utilities/helper'
const views = getViewsList()
</script>

<template>
  <v-bottom-navigation>
    <v-btn value="recent" v-for="view in views" :key="view.name">
      <i :class="view.icon" />
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped></style>
