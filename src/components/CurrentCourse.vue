<script setup lang="ts">
import { isMobile } from '../utilities/helper'
import { useCourseStore } from '../stores/courses'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const { currentCourse } = storeToRefs(useCourseStore())
const { getCurrentCourse } = useCourseStore()

import { DateTime } from 'luxon'

onMounted(async () => {
  await getCurrentCourse()
})
</script>
<template>
  <v-row>
    <v-col>
      <p class="pa-5">{{ $t('CurrentCourse') }}</p>
      <v-card class="mx-4 rounded-xl elevation-0" id="current-course-tasks">
        <v-card-item>
          <v-img
            :width="isMobile() ? '' : '35%'"
            :src="currentCourse?.course_img"
            class="rounded-xl"
          ></v-img>
        </v-card-item>

        <v-card-title>{{ currentCourse?.course_name }}</v-card-title>

        <v-card-text class="d-flex">
          <img height="21" src="../assets/icons/calender-dates-icon.svg" />
          <v-card-subtitle
            >{{ DateTime.fromISO(currentCourse?.start_date).toFormat('dd LLLL') }} -
            {{ DateTime.fromISO(currentCourse?.end_date).toFormat('dd LLLL') }}</v-card-subtitle
          >
        </v-card-text>

        <v-card-text>
          <v-progress-linear
            model-value="20"
            color="#3473ab"
          ></v-progress-linear>
        </v-card-text>

        <v-card-item>
          <v-row>
            <v-col
              class="mb-1"
              v-for="(module, index) in currentCourse?.chapters"
              :key="index"
              cols="12"
              md="6"
            >
              <v-list class="rounded-xl elevation-1">
                <v-list-item>
                  <span class="mr-2">{{ index + 1 }}</span>
                  <span>{{ module.display_name }}</span>
                  <template v-slot:append>
                    <img src="../assets/icons/notes-icon.svg" />
                  </template>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
#current-course-tasks {
  background:  #f4f8fc;
  border-bottom: .07rem solid  #a9c9d6;
}
</style>
