<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'
import { onMounted } from 'vue'

const { user } = storeToRefs(useUserStore())
const { fetchUserProfile } = useUserStore()

onMounted(async () => {
  await fetchUserProfile()
})
</script>

<template>
  <v-card class="d-flex mx-4 my-3 elevation-0">
    <v-avatar class="ma-3" size="3.75rem">
      <v-img :src="user?.profile_image.image_url_full" alt="user-Profile"></v-img>
    </v-avatar>

    <v-card-item>
      <v-card-title id="user-name" class="text-h6">{{ user?.name }}</v-card-title>
      <v-card-subtitle id="job-title" class="text-subtitle-1">
        {{ $t('JobTitle') }} {{ user?.bio }}</v-card-subtitle
      >
    </v-card-item>
  </v-card>
</template>

<style scoped>
#user-name {
  font-weight: 500;
}

#job-title {
  font-weight: lighter;
}
</style>
