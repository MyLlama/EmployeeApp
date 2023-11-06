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
      Date.parse(section.start) <= Date.now() && Date.parse(section.due) >= Date.now() && sections.push(section)
      return section;
    })
    return sections
  }, [])
  return sections;
}



</script>
<template>
  <v-row>
    <v-col>
      <p class="pa-5">For Today</p>
      <v-card class="mx-4 rounded-xl py-3 mt-3" v-for="section in sections()" :key="section.id" id="learning-module-card">
        <v-row>
          <v-col>
            <v-card-title class="text-body-1">{{ section.display_name }}</v-card-title>
            <v-card-item>
              <VsxIcon iconName="Paperclip2" class="mr-2" :size="18" type="linear" />
              <span class="pb-1">{{ section?.type }}</span>
            </v-card-item>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-card-item class="d-flex justify-end">
              <v-chip color="black" class="text-body-2" size="x-small" label variant="tonal"> Before </v-chip>
              <p class="text-h5 text-sm-h4 mt-2"> {{ DateTime.fromISO(section.due).toFormat('dd LLL') }}</p>
            </v-card-item>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template> 

<style scoped>
#learning-module-card {
  border: 2px solid #b1b4ff;
  background: radial-gradient(108.29% 126.73% at 8.66% -41.4%,
      rgba(0, 0, 0, 0.07) 0%,
      rgba(0, 0, 0, 0) 100%),
    radial-gradient(111.01% 98.09% at 92.56% 114.4%,
      rgba(255, 255, 255, 0.24) 0%,
      rgba(255, 255, 255, 0) 100%),
    #b1b4ff;
  box-shadow: 0px 12px 10px -3px rgba(177, 180, 255, 0.3);
  font-family: 'Albert Sans', sans-serif;
}
</style>
