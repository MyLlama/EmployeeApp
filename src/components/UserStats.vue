<script setup lang="ts">
import { isMobile } from '../utilities/helper'
</script>

<template>
  <v-card class="mx-4 my-4 px-2 mb-1 rounded-xl" elevation="0" id="user-stats-card">
    <v-row>
      <v-col v-for="n in 3" :key="n" cols="4" class="px-0 py-7">
        <v-card-item class="text-center px-2 my-2" id="user-stats-card-item">
          <p style="font-size: 12px">Completed</p>
          <v-card-title style="font-size: 20px" class="mt-1 mr-12">2</v-card-title>
        </v-card-item>
      </v-col>
    </v-row>
  </v-card>
</template>
<style scoped>
#user-stats-card-item {
  border-width: 0px 1px;
  border-style: dashed;
  border-color: var(--user-stats-card-border-color1);
}
#user-stats-card-item:nth-child(1) {
  font-family: 'Albert Sans', sans-serif;
  color: rgb(46, 68, 92);
}

#user-stats-card {
  border: 2px solid var(--user-stats-card-border-color);
  background: var(--user-stats-background-color);
}
</style>
