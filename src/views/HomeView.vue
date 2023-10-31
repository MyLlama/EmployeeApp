<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { storeToRefs } from "pinia";
import { ref } from 'vue'
import smiley from '../assets/images/Smiley.svg'
import { isMobile } from '../utilities/helper'

const { fetchUserProfile } = useUserStore();
const { user } = storeToRefs(useUserStore())
const width = isMobile() ? ref(window.innerWidth - 48) : 600;

function getGreetingMessage() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour < 12) {
    return "Good Morning !!";
  } else if (currentHour < 18) {
    return "Good Afternoon !!";
  } else {
    return "Good Evening !!";
  }
}

onMounted(async () => {
  await fetchUserProfile();
})
</script>

<template>
  <v-list-item class="pa-6">
    <template v-slot:append>
      <v-img height="60" width="60" :src="smiley"></v-img>
    </template>
    <p class="overline text-capitalize">Hi {{ user.name }}, </p>
    <v-list-item-title class="text-h5">
      {{ getGreetingMessage() }}
    </v-list-item-title>
  </v-list-item>

  <v-row>
    <v-col>
      <v-sheet class="px-6 py-2">
        <video class="ma-auto rounded-xl" :width="width" :height="width" controls autoplay>
          <source src="http://13.235.49.69:1337/uploads/Untitled_video_f43759613c.mp4" type="video/mp4">'
        </video>
      </v-sheet>
    </v-col>

    <v-col>
      <p class="px-6 py-2 text-body-1">Things to do</p>

      <v-card variant="tonal" class="mx-6 my-2 rounded-xl activity-card">
        <v-card-item>
          <v-card-title>Complete Quiz</v-card-title>
        </v-card-item>

        <v-card-item>
          Related to understanding of the key concepts in Initiate.
        </v-card-item>

        <v-card-actions>
          <p class="text-caption pa-2">before: 4 Sept 2023</p>

          <v-spacer></v-spacer>
          <div class="px-6 d-flex">
            <p class="text-caption mr-2">Try now</p>
            <i class="isax isax-arrow-right" />
          </div>
        </v-card-actions>
      </v-card>

      <v-card variant="outlined" class="ma-6 rounded-xl checklist-card">
        <v-card-item>
          <v-card-title>Check List</v-card-title>
        </v-card-item>

        <v-card-item>
          <v-list v-for="n in 3" :key="n">
            <v-list-item class="rounded-lg" variant="tonal">
              <template v-slot:prepend>
                <v-checkbox-btn :disabled="true"></v-checkbox-btn>
              </template>
              Emotional Decision-Video Session
            </v-list-item>
          </v-list>
        </v-card-item>

        <v-card-actions>
          <v-card-item>
            <p class="">5 Pending Items</p>
          </v-card-item>

          <v-spacer></v-spacer>

          <v-btn size="small" rounded="xl" color="white" class="see-all-btn px-3 ma-3">
            See all
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<style>
.activity-card {
  background: linear-gradient(279deg, #91F1CF 0.7%, #BCFFE7 103.54%);
}

.see-all-btn {
  background: radial-gradient(92.93% 98.54% at 18.36% -18.51%, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(94.6% 106.8% at 71.33% 102.3%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.00) 100%), #FF6839;
}

.checklist-card {
  border: 2px solid #d0cccc;
}
</style>
