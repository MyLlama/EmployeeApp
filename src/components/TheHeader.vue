<script setup lang="ts">
import logo from '../assets/images/logo.svg'
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
</script>

<template>
  <v-app-bar :elevation="1">
    <template v-slot:prepend>
      <v-img height="1.87rem" width="2.5rem" :src="logo"></v-img>
    </template>
    <v-app-bar-title :class="mobile ? 'd-flex justify-space-evenly mr-9 ml-0' : ''">
      {{ $t('Llama') }}
    </v-app-bar-title>
  </v-app-bar>
</template>

<style scoped></style>
