<template>
  <v-btn :color="color" :class="buttonClass" :size="buttonSize" :variant="variant">
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
// Define the variant type with the specific string literals and undefined
type VariantType = 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain' | undefined

// we're using a type assertion String as () => VariantType to tell TypeScript that the type of variant is one of the specific strings, or undefined. The default is set to undefined to explicitly allow for the case where variant is not provided.

defineProps({
  color: String,
  buttonClass: String,
  buttonSize: String,
  variant: {
    type: String as () => VariantType,
    default: undefined
  }
})
</script>
