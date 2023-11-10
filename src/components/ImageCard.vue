<script setup lang="ts">
  import { onMounted } from 'vue'
  import { getBaseColorAndClosestPalette } from '../utilities/colorUtil'

  const props = defineProps({
    imageUrl: String,
  })

  let textColor
  let backgroundColor
  
  onMounted(async () => {
    const color = await getBaseColorAndClosestPalette(props.imageUrl)

    textColor = `rgb(${color.closestPalette.colors[0]})`
    backgroundColor = `rgb(${color.closestPalette.colors[2]})`

    const card = document.getElementById('card')
    card.style.color = textColor
    card.style.backgroundColor = backgroundColor
  })
</script>

<template>
  <v-card id="card">
    <slot></slot>
  </v-card>
</template>

