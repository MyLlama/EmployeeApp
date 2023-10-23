<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'

const { user } = storeToRefs(useUserStore())
const { getUserProfile } = useUserStore()

getUserProfile('disha_12');

</script>

<template>
  <div>
    {{ user }}
  </div>
</template>