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
  <v-card class="mx-1 elevation-0">
    <v-card-title class="d-flex d-sm-none text-h5 font-weight-regular">{{
      currentCourse?.course_name
    }}</v-card-title>
    <v-card-item>
      <v-row>
        <v-col cols="12" md="6">
          <v-img
            :src="currentCourse?.course_img"
            class="rounded-xl elevation-3"
            :class="isMobile() ? '' : 'mt-2'"
          ></v-img>
        </v-col>
        <v-col cols="12" md="6">
          <v-card-title class="text-center d-none d-sm-flex">{{
            currentCourse?.course_name
          }}</v-card-title>

          <v-card-text class="pa-0 text-justify text-body-1">
            {{ currentCourse?.course_discription }}
          </v-card-text>

          <v-card-item
            class="rounded-xl elevation-0"
            :class="isMobile() ? 'mt-11' : 'mt-2'"
            id="user-stats-card"
          >
            <v-row>
              <v-col cols="6" sm="6" xs="6" md="6" class="px-0 py-2">
                <v-card-item class="justify-center align-center" id="user-stats-card-item">
                  <BaseButton
                    buttonClass="elevation-0 bg-transparent text-capitalize"
                    style="font-size: 14px"
                  >
                    <img src="../assets/icons/notes2-icon.svg" style="height: 25px" class="mr-2" />
                    {{ currentCourse?.chapters.length }} chapters
                  </BaseButton>
                </v-card-item>
              </v-col>
              <v-col cols="6" sm="6" xs="6" md="6" class="px-0 py-2">
                <v-card-item class="text-center" id="user-stats-card-item">
                  <BaseButton
                    buttonClass="elevation-0 bg-transparent text-capitalize"
                    style="font-size: 14px"
                  >
                    <img
                      src="../assets/icons/calender2-icon.svg"
                      style="height: 25px"
                      class="mr-2"
                    />
                    {{
                      Math.ceil(
                        DateTime.fromISO(currentCourse?.end_date).diff(
                          DateTime.fromISO(currentCourse?.start_date),
                          'days'
                        ).days
                      )
                    }}
                    days
                  </BaseButton>
                </v-card-item>
              </v-col>
            </v-row>
          </v-card-item>

          <v-card-text
            class="d-flex justify-center d-sm-none py-0 mt-9 mb-3 text-body-1 text-center"
            >Currently Ongoing</v-card-text
          >
          <v-card
            :width="isMobile() ? '100%' : '50%'"
            class="course-progress-button d-flex justify-flex-start px-0 pa-1 rounded-xl mt-2 elevation-0"
          >
            <v-card-item>
              <img src="../assets/icons/chart-success.svg" style="height: 25px" class="mt-2" />
            </v-card-item>
            <v-card-item class="px-0 mx-0">
              <p style="font-size: 16px">Course Progress</p>
              <p style="font-size: 11px">Check Progress, tasks, activity</p>
            </v-card-item>
            <v-card-item class="mx-0">
              <img
                src="../assets/icons/arrow-right3.svg"
                :class="isMobile() ? 'ml-16 mt-2' : 'ml-4'"
                style="height: 25px"
              />
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>

<style scoped>
#user-stats-card-item {
  border-width: 0px 1px;
  border-style: dashed;
  border-color: var(--user-stats-card-border-color1);
}
#user-stats-card-item:nth-child(1) {
  color: var(--user-stats-title-color);
}
#user-stats-card {
  border: 1px dashed var(--user-stats-text-border-color2);
  background: var(--user-stats-background-color);
}
.course-progress-button {
  color: var(--expansion-panel-course-progress-button-color);
  border-radius: var(--expansion-panel-course-progress-button-border-radius);
  border: 1px solid var(--llama-primary-default, #ff6839);
  background: var(--expansion-panel-course-progress-button-background);
  box-shadow: var(--expansion-panel-course-progress-button-box-shadow);
}
</style>
