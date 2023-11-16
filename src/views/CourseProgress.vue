<script setup lang="ts">
import { useCourseStore } from '@/stores/courses'
import { onMounted, ref } from 'vue'
import ModuleCard from '@/components/ModuleCard.vue'

// States for showing the calendar and toggling the icon
const showCalendar = ref(false)

// Method to toggle calendar visibility
const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value
}

const courseStore = useCourseStore()

const { currentCourse } = courseStore
// v-date-picker typically expects an array to handle multiple dates selection scenarios.
const date = ref([new Date()])

const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' }
const currentDate = ref(new Date().toLocaleDateString('en-GB', options))

onMounted(async () => {
  await courseStore.getCurrentCourse()
})
</script>

<template>
  <v-sheet class="py-2 px-5" color="var(--llama-secondary-label)">
    <v-breadcrumbs class="d-flex align-center">
      <v-breadcrumbs-item>Courses</v-breadcrumbs-item>
      <v-breadcrumbs-divider>
        <img src="../assets/icons/arrow-right2.svg" />
      </v-breadcrumbs-divider>
      <v-breadcrumbs-item>
        {{ currentCourse.course_name }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </v-sheet>

  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-5 graph-card" elevation="0">
          <v-card-item>
            <v-card-title class="text-subtitle-1 font-weight-medium">Daily Activities</v-card-title>
            <v-card-subtitle>Engagement on course</v-card-subtitle>
          </v-card-item>
          <v-card-text> Here comes the graph </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col>
            <v-card class="d-flex flex-row align-center py-2 px-3 cal-card" elevation="0">
              <v-card-title class="font-weight-regular">Events</v-card-title>
              <v-spacer></v-spacer>

              <v-card-actions class="justify-end cal-icon-card" @click="toggleCalendar">
                <img v-if="showCalendar" src="../assets/icons/cross-icon.svg" />
                <img v-else src="../assets/icons/calender-icon.svg" />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-if="showCalendar">
          <v-col class="d-flex justify-center">
            <v-date-picker
              class="graph-card"
              elevation="0"
              show-adjacent-months
              v-model="date"
            ></v-date-picker>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex justify-center">
            <v-btn class="text-none py-2 px-7 text-subtitle-1 font-weight-regular btn-show-old">
              Show Older
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-center pb-0">
        <v-chip variant="text" class="text-caption">{{ currentDate }}</v-chip>
      </v-col>
      <v-col cols="12" class="pa-0 ma-0">
        <v-divider class="divider"></v-divider>
      </v-col>
      <v-col>
        <ModuleCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
:deep(.v-date-picker) .v-date-picker__title,
:deep(.v-date-picker) .v-date-picker-header__content,
:deep(.v-date-picker) .v-date-picker-header__append,
:deep(.v-date-picker) .v-picker__actions {
  display: none;
}
:deep(.v-date-picker) .v-date-picker-controls__date {
  font-size: 1rem;
}

:deep(.v-date-picker) .v-date-picker-month {
  padding: 0;
}
.graph-card {
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.02);
}
.cal-card {
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.02);
}
.cal-icon-card {
  border-radius: 12px;
  width: 2.5rem;
  height: 2.5rem;
  min-height: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.04);
  cursor: pointer;
}

.btn-show-old {
  border-radius: 20px;
  background: #f6f6f6;
  box-shadow: 0px 8px 8px -4px rgba(0, 0, 0, 0.09);
}

.divider {
  border-style: dashed;
  height: 2px;
  opacity: 0.56;
}
</style>
