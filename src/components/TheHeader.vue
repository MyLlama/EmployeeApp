<script setup lang="ts">
import logo from '../assets/images/logo.svg'
import { isMobile } from '../utilities/helper'
</script>

<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-img height="30px" width="40px" :src="logo"></v-img>
    </template>
    <v-app-bar-title :class="isMobile() ? 'd-flex justify-space-evenly mr-9 ml-0' : ''">
      Llama
    </v-app-bar-title>
  </v-app-bar>
</template>

<style scoped></style>
