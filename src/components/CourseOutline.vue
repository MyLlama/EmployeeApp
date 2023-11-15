<script setup lang="ts">
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
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="text-center pa-3 rounded" id="course_outline-title">{{ $t('CourseOutline') }}</p>
        <v-expansion-panels
          v-for="(module, index) in currentCourse?.chapters"
          :key="index"
          class="eleva mt-2"
        >
          <v-expansion-panel elevation="0">
            <v-expansion-panel-title class="py-0 px-1">
              <v-row>
                <v-col class="d-flex">
                  <BaseButton
                    color="rgba(0, 0, 0, 0.03)"
                    icon="mdi-plus"
                    buttonClass="elevation-0 mt-4"
                    buttonSize="x-small"
                  >
                    {{ index + 1 }}
                  </BaseButton>

                  <v-card-item class="d-flex justify-center align-items-center">
                    <p class="mb-1 text-body-1">{{ module.display_name }}</p>
                    <span class="text-caption">
                      {{ DateTime.fromISO(module.start).toFormat('dd LLL') }} -
                      {{
                        DateTime.fromISO(currentCourse?.module_end_date[index]).toFormat('dd LLL')
                      }}
                      <span v-if="DateTime.now() <= DateTime.fromISO(currentCourse?.module_end_date[index])">
                        {{
                          Math.ceil(
                            DateTime.fromISO(module.start).diff(
                              DateTime.fromISO(currentCourse?.module_end_date[index]),
                              'days'
                            ).days
                          )
                        }}
                       {{ $t('days') }}
                      </span>
                      <span class="ml-2" v-if="DateTime.now() > DateTime.fromISO(currentCourse?.module_end_date[index])">
                        <img src="../assets/icons/completed.svg" />
                        {{$t('Completed')}}
                      </span>
                      <span class="px-2" v-else-if="DateTime.fromISO(module.start) < DateTime.now()">
                        <img src="../assets/icons/ongoing.svg" />
                        {{$t('Ongoing')}}
                      </span>
                    </span>
                  </v-card-item>
                </v-col>
              </v-row>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="red pa-0">
              <v-sheet class="elevation-0 red ml-7">
                <BaseButton
                  buttonClass="expansion-panel-course-progress-button rounded-pill elevation-0 px-5 text-capitalize text-body-1"
                  height="45"
                >
                 {{$t('CheckProgress')}}
                  <img src="../assets/icons/arrow-right_upword.svg" class="ml-2" height="21" />
                </BaseButton>
              </v-sheet>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.expansion-panel-course-progress-button {
  border-radius: var(--expansion-panel-course-progress-button-border-radius);
  background: var(--expansion-panel-course-progress-button-background);
  box-shadow: var(--expansion-panel-course-progress-button-);
  color: var(--expansion-panel-course-progress-button-color);
}
#course_outline-title {
  background: var(--course-outline-title-background-color);
}
</style>
