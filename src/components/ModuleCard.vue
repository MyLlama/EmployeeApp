<script setup lang="ts">
import { useCourseStore } from '../stores/courses'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { DateTime } from 'luxon'

const { currentCourse } = storeToRefs(useCourseStore())
const { getCurrentCourse } = useCourseStore()
onMounted(async () => {
  await getCurrentCourse()
})
const sections = () => {
  const sections = currentCourse.value.chapters.reduce((sections: any, chapter: any) => {
    chapter.section?.map((section: any) => {
      Date.parse(section.start) <= Date.now() &&
        Date.parse(section.due) >= Date.now() &&
        sections.push(section)
      return section
    })
    return sections
  }, [])
  return sections
}
</script>
<template>
  <v-row>
    <v-col>
      <p class="pa-5">{{ $t('ForToday') }}</p>
      <v-card
        class="mx-2 rounded-xl py-5 mt-3 px-2"
        v-for="section in sections()"
        :key="section.id"
        id="learning-module-card"
      >
        <v-row>
          <v-col class="pa-1">
            <p style="width:15.625rem;" class="module-title font-weight-regular text-body-1 pl-4">{{
              section.display_name
            }}</p>

            <v-card-item>
              <img class="mr-2" src="../assets/icons/link-icon.svg" />
              <span class="pb-1 font-weight-normal text-body-1">{{ section?.type }}</span>
            </v-card-item>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pa-1">
            <v-card-item class="d-flex justify-end pa-0 pr-4">
              <v-chip color="black" class="text-body-2" size="x-small" label variant="tonal">
                Before
              </v-chip>
              <p style="width: 5rem;" class="text-h5 text-sm-h4 mt-3">
                {{ DateTime.fromISO(section.due).toFormat('dd LLL') }}
              </p>
            </v-card-item>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
#learning-module-card {
  border: var(--learning-module-border);
  background: var(--learning-module-card);
  box-shadow: var(--learning-module-card-box-shadow);
  font-family: 'Albert Sans', sans-serif;
}
</style>
