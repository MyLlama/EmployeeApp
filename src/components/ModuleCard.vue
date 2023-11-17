<script setup lang="ts">
import { useCourseStore } from '../stores/courses'
import { storeToRefs } from 'pinia'
import { onMounted, computed, ref } from 'vue'
import { DateTime } from 'luxon'
import { useRoute } from 'vue-router'

const { currentCourse } = storeToRefs(useCourseStore())
const { getCurrentCourse } = useCourseStore()
const route = useRoute()

// Define Props
const props = defineProps({
  customDate: {
    type: Number,
    default: Date.now()
  }
})

// Reactive ref to control bottom sheet visibility for event detail
const isEventDetailVisible = ref(false)
const selectedSection = ref(null)

// Methods to open and close bottom sheet
const openBottomSheet = (section) => {
  selectedSection.value = section
  isEventDetailVisible.value = true
}

const closeBottomSheet = () => {
  isEventDetailVisible.value = false
}

onMounted(async () => {
  await getCurrentCourse()
})

const isLearningPage = computed(() => route.path === '/learning')

const sections = () => {
  const selectedDate = props.customDate
  const sections = currentCourse.value.chapters.reduce((sections: any, chapter: any) => {
    chapter.section?.map((section: any) => {
      Date.parse(section.start) <= selectedDate &&
        Date.parse(section.due) >= selectedDate &&
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
      <p v-if="isLearningPage" class="pa-5">{{ $t('ForToday') }}</p>

      <!-- Add @click event to the card to open the bottom sheet -->
      <v-card
        class="mx-4 rounded-xl py-3 mt-3"
        v-for="section in sections()"
        :key="section.id"
        id="learning-module-card"
        @click="openBottomSheet(section)"
      >
        <v-row>
          <v-col>
            <v-card-title class="module-title font-weight-medium text-body-1">
              {{ section.display_name }}
            </v-card-title>

            <v-card-item>
              <img class="mr-2" src="../assets/icons/link-icon.svg" />
              <span class="pb-1 font-weight-normal text-body-1">{{ section?.type }}</span>
            </v-card-item>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-card-item class="d-flex justify-end pa-0 mt-3 mr-3">
              <v-chip color="black" class="text-body-2" size="x-small" label variant="tonal">
                Before
              </v-chip>
              <p class="text-h5 text-sm-h4 mt-2">
                {{ DateTime.fromISO(section.due).toFormat('dd LLL') }}
              </p>
            </v-card-item>
          </v-col>
        </v-row>
      </v-card>
      <!-- Bottom Sheet -->

      <v-bottom-sheet v-model="isEventDetailVisible" scrollable>
        <v-card class="rounded-t-xl">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-center flex-grow-1 event-title">{{ $t('EventDetail') }}</span>
            <v-btn @click="closeBottomSheet" elevation="0" class="pointer">
              <img src="../assets/icons/cross-icon.svg" />
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text> This is card text component. </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </v-col>
  </v-row>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Da+2&display=swap');

#learning-module-card {
  border: var(--learning-module-border);
  background: var(--learning-module-card);
  box-shadow: var(--learning-module-card-box-shadow);
  font-family: 'Albert Sans', sans-serif;
}

.event-title {
  font-family: 'Baloo Da 2', sans-serif;
  font-size: 1rem;
  font-weight: 400;
}
</style>
