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
                    buttonClass="elevation-0 bg-transparent text-capitalize text-body-2">
                    <img src="../assets/icons/notes-icon.svg"  class="mr-2" />
                    {{ currentCourse?.chapters.length }} {{$t('Chapters')}}
                  </BaseButton>
                </v-card-item>
              </v-col>
              <v-col cols="6" sm="6" xs="6" md="6" class="px-0 py-2">
                <v-card-item class="text-center" id="user-stats-card-item">
                  <BaseButton
                    buttonClass="elevation-0 bg-transparent text-capitalize text-body-2">
                    <img
                      src="../assets/icons/calender-icon.svg"
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
                    {{$t('days')}}
                  </BaseButton>
                </v-card-item>
              </v-col>
            </v-row>
          </v-card-item>

          <v-card-text
            class="d-flex justify-center d-sm-none py-0 mt-9 mb-3 text-body-1 text-center"
            >{{$t('CurrentlyOngoing')}}</v-card-text
          >
          <v-card
            :width="isMobile() ? '100%' : '50%'"
            class="course-progress-button d-flex justify-flex-start px-0 pa-1 rounded-xl mt-2 elevation-0"
          >
            <v-card-item>
              <img src="../assets/icons/chart-success.svg" class="mt-2"  height="25" />
            </v-card-item>
            <v-card-item class="px-0 mx-0">
              <p  class="text-body-1 font-weight-regular">{{$t('CourseProgress')}}</p>
              <p  class="text-caption">{{$t('CPTA')}}</p>
            </v-card-item>
            <v-card-item class="mx-0">
              <img
                src="../assets/icons/arrow-right_upword.svg"
                :class="isMobile() ? 'ml-16 mt-2' : ''"
                height="25"
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
  border-width: 0rem .07rem;
  border-style: dashed;
  border-color: var(--user-stats-text-border-color);
}
#user-stats-card-item:nth-child(1) {
  color: var(--user-stats-title-color);
}
#user-stats-card {
  border: .07rem dashed var(--user-stats-text-border-color);
  background: var(--user-stats-background-color);
}
.course-progress-button {
  border: .07rem solid #ff6839;
  border-radius:1.32rem;
  background: linear-gradient(
      0deg,
      var(--llama-primary-default, #ff6839) 0%,
      var(--llama-primary-default, #ff6839) 100%
    ),
    #fff;
  box-shadow: 0px 3px 5px -3px rgba(237, 77, 24, 0.23);
  color:white;
}
</style>
