<script setup lang="ts">
import { computed } from 'vue'

const currentYear = 2023 // will need to make this dynamic as well
const currentMonth = 10 // October
const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate() // 31 oct 2023 ==> 31
const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay() // 1 oct 2023 ==> 0 ==> Sunday
console.log(firstDayOfMonth)
console.log(daysInMonth)

// const weeks = computed(() => {
let days: number[] = []
// Populate days of the month
Array.from({ length: daysInMonth }).forEach((_, index) => days.push(index))
console.log(days)
// Pad the beginning of the month with empty days until first day
Array.from({ length: firstDayOfMonth }).forEach(() => days.unshift(0))
console.log(days)

// })
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="day in daysOfWeek" :key="day" cols="1">
        {{ day }}
      </v-col>
    </v-row>
  </v-container>
</template>
