<script setup lang="ts">
import { ref, computed } from 'vue'

const currentDate = ref(new Date())
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const daysInMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate())
const firstDayOfMonth = computed(() => new Date(currentYear.value, currentMonth.value, 1).getDay())

console.log(currentDate)
console.log(currentYear)
console.log(currentMonth)
console.log(firstDayOfMonth)
console.log(daysInMonth)

const weeks = computed(() => {
  let days: number[] = []
  // Populate days of the month
  Array.from({ length: daysInMonth.value }).forEach((_, index) => days.push(index))
  // console.log(days)
  // Pad the beginning of the month with empty days until first day
  Array.from({ length: firstDayOfMonth.value }).forEach(() => days.unshift(0))
  // console.log(days)

  // split days into weeks
  let weeks: number[][] = []
  // while days still has elements left in it
  while (days.length) {
    let week: number[] = []
    // removes the first seven elements from the days array and then add to the week array.
    for (let day of days.splice(0, 7)) {
      week.push(day)
      // console.log(day)
    }
    weeks.push(week)
    // console.log(weeks)
  }
  return weeks
})
</script>

<template>
  <div>
    <!-- Header for days of week -->

    <v-row class="calendar-header">
      <v-col v-for="day in daysOfWeek" :key="day" cols="1">
        {{ day }}
      </v-col>
    </v-row>

    <!-- Days in the calendar -->
    <v-row v-for="week in weeks" :key="week.toString()">
      <v-col
        v-for="day in week"
        :key="day"
        class="calendar-day"
        :class="{ 'inactive-day': day === 0 }"
        cols="1"
      >
        {{ day || '' }}
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.calendar-wrapper {
  display: flex;
  flex-direction: column;
  overflow-x: auto;
}

.calendar-header,
.calendar-week {
  display: flex;
  flex-direction: row;
}

.calendar-day {
  min-width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
}

.inactive-day {
  opacity: 0.5;
}

.calendar-day:nth-child(3) {
  background-color: #ffa500;
  color: white;
}
</style>
