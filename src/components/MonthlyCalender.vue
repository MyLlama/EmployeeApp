<script setup lang="ts">
import { ref, computed } from 'vue'

const currentDate = ref(new Date())
const todayDate = ref(currentDate.value.getDate().toString().padStart(2, '0'))

function* dateRange(startDate: Date, days: number) {
  const currentDate = new Date(startDate)
  for (let i = 0; i < days; i++) {
    yield new Date(currentDate)
    currentDate.setDate(currentDate.getDate() + 1)
  }
}

const dynamicDates = computed(() => {
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const startDate = new Date(currentDate.value)
  startDate.setDate(parseInt(todayDate.value) - 2) // Setting starting date

  return Array.from(dateRange(startDate, 5)).map((date) => {
    const dayName = dayNames[date.getDay()]
    return {
      day: dayName,
      number: date.getDate().toString().padStart(2, '0')
    }
  })
})
</script>

<template>
  <v-card class="d-flex justify-space-between ma-4 pa-2 elevation-0">
    <div
      v-for="date in dynamicDates"
      :key="date.number"
      class="py-2 px-3 mr-2 text-center rounded-pill text-body-1"
      :class="{ highlighted: date.number === todayDate }"
    >
      {{ date.day }}
      <div class="number text-h6">{{ date.number }}</div>
    </div>
  </v-card>
</template>

<style scoped>
.highlighted {
  background-color: #ffd58a;
}
</style>
