<script setup lang="ts">
import llama_img from '../assets/images/quize_llama_img.svg'
import ellipse from '../assets/images/quize_img_ellipse.svg'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <!-- breadcrumbs label -->
  <v-breadcrumbs :items="['Managing Emotions', 'Initiate']" bg-color="var(--llama-secondary-label)">
    <template v-slot:divider>
      <img class="mt-2" src="../assets/icons/arrow-right2.svg" />
    </template>
  </v-breadcrumbs>

  <!-- Quiz name  -->
  <v-sheet class="mx-2 mt-4 elevation-0">
    <p class="py-0 px-1 text-subtitle-1">Quiz:</p>
    <p class="py-0 px-1 text-h5">Key Concepts</p>
  </v-sheet>

  <!-- Quize details sheet -->
  <v-sheet class="d-flex mx-2 mt-6">
    <p class="py-1 px-1">Questions: 23</p>
    <v-spacer></v-spacer>
    <p class="py-1 px-1 text">MCQ</p>
  </v-sheet>

  <v-row>
    <!-- number of questions with llama img card  -->
    <v-col cols="12" md="5">
      <v-card class="llama-img-card mx-2 d-flex rounded-xl elevation-0 mt-3">
        <v-card-item class="pa-0">
          <v-card-text class="py-1 text-h4 font-weight-black">23</v-card-text>
          <v-card-text class="py-1 mt-2 text-body-1">Questions</v-card-text>
        </v-card-item>
        <v-spacer></v-spacer>
        <v-card-item class="px-4 mt-2 pa-0">
          <v-img :src="ellipse" width="95"></v-img>
          <v-img :src="llama_img" width="70" class="quize-llama-img"></v-img>
        </v-card-item>
      </v-card>
    </v-col>

    <!-- about the quize -->
    <v-col cols="12" md="7">
      <v-card class="about-card mx-2 py-3 rounded-xl elevation-0 mt-3">
        <v-card-title class="py-1">About</v-card-title>
        <v-card-text class="text-grey-darken-1 text-subtitle-2 font-weight-regular">
          This quiz is related to understanding of the key concepts covered in Module 1: "What is
          Emotional Intelligence?" Please answer the following questions to the best of your
          knowledge.
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Instruction of the quize -->
  <v-card class="instruction-card mx-2 py-3 rounded-xl elevation-0 mt-8">
    <v-card-title class="py-1">Instruction</v-card-title>
    <v-card-text class="text-subtitle-2 font-weight-regular ml-6">
      <ul>
        <li class="mb-2">
          There is no right and wrong answer, choose the answer according to you.
        </li>
        <li>Answer question as you are.</li>
      </ul>
    </v-card-text>
  </v-card>

  <!-- Start button -->
  <div class="d-flex justify-center align-center mt-6 mb-4">
    <v-btn
      @click="router.push('quizeQuestions')"
      size="large"
      class="primary-button rounded-pill text-capitalize px-11"
    >
      Start <img src="../assets/icons/start-icon.svg" />
    </v-btn>
  </div>
</template>
<style scoped>
.llama-img-card {
  background: linear-gradient(261deg, #70d9a7 15.67%, #d0fff1 96.97%);
}
.quize-llama-img {
  margin-top: -5.813rem;
  margin-left: 0.5rem;
}
.about-card {
  background: rgba(0, 0, 0, 0.02);
}
.instruction-card {
  border-bottom: 1px solid var(--llama-secondary-label, #ffc98a);
  background: rgba(249, 248, 241, 0.58);
  box-shadow: 0px 4px 16px 0px rgba(255, 255, 255, 0.44) inset;
}
</style>
