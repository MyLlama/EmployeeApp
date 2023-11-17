<script setup lang="ts">
import UserProfile from '../components/UserProfile.vue'
import UserStats from '../components/UserStats.vue'
import QuickActions from '../components/QuickActions.vue'
import MatrixMap from '../components/MatrixMap.vue'
import { isMobile } from '../utilities/helper'
import { VRow, VCol } from 'vuetify/components'

</script>

<template>
  <UserProfile />
  <v-row>
    <v-col cols="12" md="6">
      <UserStats />
      <QuickActions class="ma-8" v-if="!isMobile()" />
    </v-col>
    <v-col cols="12" md="6">
      <MatrixMap />
    </v-col>
  </v-row>

  <v-row v-if="isMobile()">
    <v-col cols="12" md="6">
      <QuickActions />
    </v-col>
  </v-row>
</template>

<style scoped></style>
