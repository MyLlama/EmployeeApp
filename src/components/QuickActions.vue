<script setup lang="ts">
import heartIcon from '../assets/icons/heart-icon.svg'
import savedIcon from '../assets/icons/saved-icon.svg'
import corusesIcon from '../assets/icons/courses-icon.svg'
import settingsIcon from '../assets/icons/setting-icon.svg'
import logoutIcon from '../assets/icons/logout-icon.svg'
import { useAuthStore } from '../stores/auth.ts'
import { isMobile } from '../utilities/helper'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
 if (window.confirm("Are you sure you want to log out?")) {
    authStore.logout(router);
  }
}

function quickActions() {
return [
    {
      name: 'Favorite',
      icon: heartIcon,
      background:
        'radial-gradient(104.17% 104.17% at 77.62% 22.26%, #FF9AAC 0%, rgba(255, 223, 213, 0.91) 100%)',
      color: '#E33F49',
      variant: 'text'
    },
    {
      name: 'Saved',
      icon: savedIcon,
      background: 'radial-gradient(107.87% 107.87% at 82.89% 25.12%, #6EDA93 0%, #D3FFE2 100%)',
      color: '#0E8336',
      variant: 'text'
    },
    {
      name: 'Courses',
      icon: corusesIcon,
      background: 'radial-gradient(125.04% 125.04% at 79.81% 16.31%, #F19D60 0%, #FCF0E2 100%)',
      color: '#AA5110',
      variant: 'text'
    },
    {
      name: 'Settings',
      icon: settingsIcon,
      background: 'radial-gradient(114.12% 114.12% at 86.32% 13.29%, #A9A9A9 0%, #E8E8E8 100%)',
      color: '#3A3A3A',
      variant: 'text'
    },
    {
      name: 'Logout',
      icon: logoutIcon,
      background: 'rgba(242, 161, 161, 0.06)',
      color: '#E33F49',
      variant: 'outlined',
      action: logout
    }
  ]
}

const quickActionBtns = quickActions()

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
          @click="quickAction.action ? quickAction.action() : null"
          :color="quickAction.color"
          :style="{ background: quickAction.background }"
          buttonClass="rounded-circle mb-2 elevation-0"
          :class="isMobile() ? 'ml-4' : ''"
          height="63"
          width="60"
          :variant="quickAction.variant"
        >
          <img :src="quickAction.icon" class="mx-2" style="height: 21px" />
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
