<template>
  <v-btn :color="color" :class="buttonClass" :variant="variant">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    color: String,
    buttonClass: String,
    buttonText: String,
    variant: String
  }
}
</script>
