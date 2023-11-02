<script setup lang="ts">
import { quickActions } from '../utilities/helper'
import BaseButton from '../components/BaseButton.vue'
import { useAuthStore } from '../stores/auth.ts'
import { isMobile } from '../utilities/helper'
import { useRouter } from 'vue-router'

const router = useRouter()
const quickActionBtns = quickActions()
const authStore = useAuthStore()

const logout = (quickAction: any) => {
  if (quickAction.name === 'Logout') {
    authStore.logout(router)
  }
}
</script>

<template>
  <v-card class="mx-4 mb-1 rounded-xl elevation-0">
    <v-card-title class="quick-actions-card-title">{{ $t('QuickActions') }}</v-card-title>
    <v-row class="d-flex flex-start pa-5 mt-3">
      <v-col
        v-for="quickAction in quickActionBtns"
        :key="quickAction.name"
        cols="auto"
        class="d-flex flex-column align-center"
      >
        <BaseButton
          @click="logout(quickAction)"
          :color="quickAction.color"
          :style="{ background: quickAction.background }"
          buttonClass="rounded-circle mb-2 elevation-0"
          :class="isMobile() ? 'ml-4' : ''"
          height="63"
          width="60"
          :variant="quickAction.variant"
        >
          <VsxIcon :iconName="quickAction.icon" :size="20" type="linear" class="mx-2" />
        </BaseButton>

        <span class="quick-action-button-name" :class="isMobile() ? 'ml-4' : ''">{{
          $t(quickAction.name)
        }}</span>
      </v-col>
    </v-row>
  </v-card>
</template>
<style scoped>
.quick-actions-card-title,
.quick-action-button-name {
  font-family: 'Albert Sans', sans-serif;
}
</style>
