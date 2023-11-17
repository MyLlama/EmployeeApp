<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import smiley from '../assets/images/Smiley.svg'
import { isMobile } from '../utilities/helper'
import { useCmsStore } from '../stores/cms'
import { useCourseStore } from '../stores/courses'
import { DateTime } from 'luxon'
import ImageCard from '@/components/ImageCard.vue'

const { getCurrentCourse } = useCourseStore()
const { activityData } = useCmsStore()
const { fetchUserProfile } = useUserStore()
const { user } = storeToRefs(useUserStore())
const { currentCourse } = storeToRefs(useCourseStore())
const width = ref(isMobile() ? window.innerWidth - 96 : 480)

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

const sections = () => {
  return currentCourse.value.chapters.reduce((sections: any, chapter: any) => {
    chapter.section?.map((section: any) => {
      if (!section.due) sections.push(section)
    })
    return sections
  }, [])
}

const todos = () => {
  return currentCourse.value.chapters.reduce((sections: any, chapter: any) => {
    chapter.section?.map((section: any) => {
      if (section.due) sections.push(section)
    })
    return sections
  }, [])
}

const activity = ref()

const showCompleteChecklist = ref(false)

onMounted(async () => {
  await fetchUserProfile()
  activity.value = await activityData()
  await getCurrentCourse()
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
    <v-col v-if="activity?.type">
      <v-sheet class="px-6 py-2">
        <ImageCard
          class="rounded-xl pa-2"
          :image-url="activity.type === 'images' ? activity?.media[0] : activity?.media.thumbnail"
        >
          <v-card-title> Mindfulness Moment </v-card-title>

          <v-card-subtitle> Let the soothing waves wash away stress </v-card-subtitle>

          <v-card-item class="my-3">
            <video
              v-if="activity?.type === 'video'"
              :poster="activity?.media.thumbnail"
              class="ma-auto rounded-xl"
              :width="width"
              :height="width - 150"
              controls
              autoplay
            >
              <source :src="activity?.media.data" type="video/mp4" />
            </video>

            <video
              controls
              :width="width"
              :height="width - 150"
              v-else-if="activity?.type === 'audio'"
              :poster="activity?.media.thumbnail"
            >
              <source :src="activity?.media.data" type="audio/mp3" />
            </video>

            <v-carousel
              :width="width"
              :height="width - 150"
              hide-delimiters
              v-else
              class="ma-auto rounded-xl"
            >
              <v-carousel-item v-for="item in activity?.media" :key="item" :src="item" cover />
            </v-carousel>
          </v-card-item>
        </ImageCard>
      </v-sheet>
    </v-col>

    <v-col>
      <p class="px-6 py-2 text-body-1">Things to do</p>

      <v-card
        variant="tonal"
        class="mx-6 my-2 rounded-xl activity-card"
        v-for="todo in todos()"
        :key="todo"
      >
        <v-card-item>
          <v-card-title>{{ todo.display_name }}</v-card-title>
        </v-card-item>

        <v-card-item>{{ todo.description }}</v-card-item>

        <v-card-actions>
          <p class="text-caption pa-2">
            Before: {{ DateTime.fromISO(todo.due).toFormat('dd LLL y') }}
          </p>

          <v-spacer></v-spacer>
          <div class="px-6 d-flex">
            <p class="text-caption mr-2">Try now</p>
            <img src="../assets/icons/arrow-right.svg" />
          </div>
        </v-card-actions>
      </v-card>

      <v-card variant="outlined" class="ma-6 rounded-xl checklist-card">
        <v-card-item>
          <v-card-title>Check List</v-card-title>
        </v-card-item>

        <v-list class="mx-4">
          <v-list-item
            class="bg-grey-lighten-4 rounded-lg my-2 elevation-1 mx-1 my-3"
            v-for="index in 4"
            :key="index"
          >
            {{ sections()[index]?.display_name }}
            <template v-slot:append>
              <img class="pointer" src="../assets/icons/arrow-right2.svg" />
            </template>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-card-item>
            <p>{{ sections().length }} Pending Items</p>
          </v-card-item>

          <v-spacer></v-spacer>

          <v-bottom-sheet v-model="showCompleteChecklist">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                size="small"
                rounded="xl"
                color="white"
                class="see-all-btn px-3 ma-3"
                elevation="1"
              >
                See all
              </v-btn>
            </template>

            <v-card class="rounded-t-xl">
              <template v-slot:append>
                <img
                  class="pointer"
                  src="../assets/icons/add.svg"
                  @click="showCompleteChecklist = false"
                />
              </template>

              <template v-slot:title>
                <p class="text-center pb-2">Check List</p>
              </template>

              <v-divider></v-divider>

              <v-card-item class="bg-grey-lighten-5">
                <v-list class="bg-grey-lighten-5" height="400">
                  <v-list-subheader class="text-black"
                    >{{ sections().length }} Pending Items</v-list-subheader
                  >

                  <v-list-item
                    class="pa-3 mx-1 my-3 rounded-lg"
                    elevation="2"
                    v-for="section in sections()"
                    :key="section"
                  >
                    <!-- <p class="text-caption font-weight-thin text-grey-darken-2">Complete the exercise</p> -->

                    <v-list-item-title>{{ section.display_name }}</v-list-item-title>

                    <template v-slot:append>
                      <img
                        class="pointer pr-3"
                        src="../assets/icons/arrow-right2.svg"
                        @click="showCompleteChecklist = false"
                      />
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-item>
            </v-card>
          </v-bottom-sheet>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="activity?.type">
      <v-sheet class="px-6 py-2">
        <ImageCard
          class="rounded-xl pa-2"
          :image-url="activity.type === 'images' ? activity?.media[0] : activity?.media.thumbnail"
        >
          <v-card-title> Mindfulness Moment </v-card-title>

          <v-card-subtitle> Let the soothing waves wash away stress </v-card-subtitle>

          <v-card-item class="my-3">
            <video
              v-if="activity?.type === 'video'"
              :poster="activity?.media.thumbnail"
              class="ma-auto rounded-xl"
              :width="width"
              :height="width - 200"
              controls
              autoplay
            >
              <source :src="activity?.media.data" type="video/mp4" />
            </video>

            <video
              controls
              :width="width"
              :height="width - 150"
              v-else-if="activity?.type === 'audio'"
              :poster="activity?.media.thumbnail"
            >
              <source :src="activity?.media.data" type="audio/mp3" />
            </video>

            <v-carousel
              :width="width"
              :height="width - 150"
              hide-delimiters
              v-else
              class="ma-auto rounded-xl"
            >
              <v-carousel-item v-for="item in activity?.media" :key="item" :src="item" cover />
            </v-carousel>
          </v-card-item>
        </ImageCard>
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
