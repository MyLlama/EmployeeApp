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
                    buttonClass="elevation-0 mt-2"
                    buttonSize="x-small"
                  >
                    {{ index + 1 }}
                  </BaseButton>
                  <v-card-item class="d-flex justify-center align-items-center">
                    <p style="font-size: 16px" class="mb-1">{{ module.display_name }}</p>
                    <span style="font-size: 11px">
                      {{ DateTime.fromISO(module.start).toFormat('dd LLL') }} -
                      {{
                        DateTime.fromISO(currentCourse?.module_end_date[index]).toFormat('dd LLL')
                      }}
                      <span>
                        {{
                          Math.ceil(
                            DateTime.fromISO(module.start).diff(
                              DateTime.fromISO(currentCourse?.module_end_date[index]),
                              'days'
                            ).days
                          )
                        }}
                        days
                      </span>
                      <span class="ml-2" v-if="module.complete">
                        <img src="../assets/icons/completed.svg" />
                        Completed
                      </span>
                      <span class="px-2" v-else>
                        <img src="../assets/icons/ongoing.svg" />
                      </span>
                      <span>Ongoing</span>
                    </span>
                  </v-card-item>
                </v-col>
              </v-row>
            </v-expansion-panel-title>

            <v-expansion-panel-text class="red pa-0">
              <v-sheet class="elevation-0 red ml-7">
                <v-card-text style="font-size: 14px" class="py-0 px-0 mb-3"
                  >Deeper dive into emotional intensification and strategies.</v-card-text
                >
                <BaseButton
                  buttonClass="expansion-panel-course-progress-button rounded-pill elevation-0 px-5 text-capitalize"
                  height="45"
                  style="font-size: 14px"
                >
                  Check Progress
                  <img src="../assets/icons/arrow-right3.svg" class="ml-2" style="height: 21px" />
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
.card-title {
  background: rgba(0, 0, 0, 0.03);
}
.expansion-panel-course-progress-button {
  border-radius:var(--expansion-panel-course-progress-button-border-radius);
  background:var(--expansion-panel-course-progress-button-background);
  box-shadow:var(--expansion-panel-course-progress-button-);
  color: var(--expansion-panel-course-progress-button-color);
}
</style>
