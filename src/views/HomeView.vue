<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import smiley from '../assets/images/Smiley.svg'
import { isMobile } from '../utilities/helper'
import { useCmsStore } from '../stores/cms'
import { useCourseStore } from '../stores/courses'

const { getCurrentCourse } = useCourseStore();
const { activityData } = useCmsStore();
const { fetchUserProfile } = useUserStore();
const { user } = storeToRefs(useUserStore())
const { currentCourse } = storeToRefs(useCourseStore())
const width = ref(isMobile() ? window.innerWidth - 48 : 600);

function getGreetingMessage() {
  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  if (currentHour < 12) {
    return 'Good Morning !!'
  } else if (currentHour < 18) {
    return 'Good Afternoon !!'
  } else {
    return 'Good Evening !!'
  }
}

const activity = ref()

onMounted(async () => {
  await fetchUserProfile();
  activity.value = await activityData();
  await getCurrentCourse();
})
</script>

<template>
  <v-list-item class="pa-6">
    <template v-slot:append>
      <v-img height="60" width="60" :src="smiley"></v-img>
    </template>
    <p class="overline text-capitalize">Hi {{ user?.name }},</p>
    <v-list-item-title class="text-h5">
      {{ getGreetingMessage() }}
    </v-list-item-title>
  </v-list-item>

  <v-row>
    <v-col>
      <v-sheet class="px-6 py-2">
        <video v-if="activity?.type === 'video'" :poster="activity?.media.thumbnail" class="ma-auto rounded-xl" :width="width" :height="width-50" controls autoplay>
          <source :src="activity?.media.data" type="video/mp4">'
        </video>
      
        <video controls :width="width" :height="width-50" v-else-if="activity?.type === 'audio'" :poster="activity?.media.thumbnail">
          <source :src="activity?.media.data" type= 'audio/mp3'>
        </video>

        <v-carousel :width="width" :height="width-50"  hide-delimiters v-else class="ma-auto rounded-xl">
          <v-carousel-item v-for="item in activity?.media" :key="item"
            :src="item"
            cover
          />
        </v-carousel>
      </v-sheet>
    </v-col>

    <v-col>
      <p class="px-6 py-2 text-body-1">Things to do</p>

      <v-card variant="tonal" class="mx-6 my-2 rounded-xl activity-card">
        <v-card-item>
          <v-card-title>Complete Quiz</v-card-title>
        </v-card-item>

        <v-card-item> Related to understanding of the key concepts in Initiate. </v-card-item>

        <v-card-actions>
          <p class="text-caption pa-2">before: 4 Sept 2023</p>

          <v-spacer></v-spacer>
          <div class="px-6 d-flex">
            <p class="text-caption mr-2">Try now</p>
            <VsxIcon iconName="ArrowSquareRight" :size="20" type="linear" />
          </div>
        </v-card-actions>
      </v-card>

      <v-card variant="outlined" class="ma-6 rounded-xl checklist-card">
        <v-card-item>
          <v-card-title>Check List</v-card-title>
        </v-card-item>

        <v-card-item>
          <v-list v-for="chapter in 3" :key="chapter">
            <v-list-item class="rounded-lg" variant="tonal">
              {{ currentCourse.chapters[chapter]?.display_name }}
            </v-list-item>
          </v-list>
        </v-card-item>

        <v-card-actions>
          <v-card-item>
            <p>{{ currentCourse.chapters.length - 3 }} Pending Items</p>
          </v-card-item>

          <v-spacer></v-spacer>

          <v-btn size="small" rounded="xl" color="white" class="see-all-btn px-3 ma-3">
            See all
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
      <v-sheet class="px-6 py-2">
        <video v-if="activity?.type === 'video'" :poster="activity?.media.thumbnail" class="ma-auto rounded-xl" :width="width" :height="width-50" controls autoplay>
          <source :src="activity?.media.data" type="video/mp4">'
        </video>
      
        <video controls :width="width" :height="width-50" v-else-if="activity?.type === 'audio'" :poster="activity?.media.thumbnail">
          <source :src="activity?.media.data" type= 'audio/mp3'>
        </video>

        <v-carousel :width="width" :height="width-50"  hide-delimiters v-else class="ma-auto rounded-xl">
          <v-carousel-item v-for="item in activity?.media" :key="item"
            :src="item"
            cover
          />
        </v-carousel>
      </v-sheet>
    </v-col>
    </v-row>
</template>
<style>
.activity-card {
  background: linear-gradient(279deg, #91f1cf 0.7%, #bcffe7 103.54%);
}

.see-all-btn {
  background: radial-gradient(
      92.93% 98.54% at 18.36% -18.51%,
      rgba(0, 0, 0, 0.16) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      94.6% 106.8% at 71.33% 102.3%,
      rgba(255, 255, 255, 0.35) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #ff6839;
}

.checklist-card {
  border: 2px solid #d0cccc;
}
#player {
  width: 100%;
}
</style>
