<script setup lang="ts"></script>
<template>
  <!-- breadcrumbs label -->
  <v-breadcrumbs :items="['Managing Emotions', 'Initiate']" bg-color="var(--llama-secondary-label)">
    <template v-slot:divider>
      <img class="mt-2" src="../assets/icons/arrow-right2.svg" />
    </template>
  </v-breadcrumbs>

  <!-- progress bar -->
  <div id="quize-progress-bar" class="rounded-pill mx-2 mt-9">
    <v-progress-linear
      class="pa-0"
      color="success"
      rounded="pill"
      model-value="25"
      :height="13"
    ></v-progress-linear>
  </div>

  <!-- Quize details sheet -->
  <v-sheet class="d-flex mx-2">
    <p class="py-1 px-1" style="font-size: 14px">
      <span style="font-size: 16px" class="font-weight-bold">9</span>/23
    </p>
    <v-spacer></v-spacer>
    <p class="py-1 px-1">MCQ</p>
  </v-sheet>

  <!-- Questions and options -->
  <v-sheet class="mt-10 mx-3">
    <p class="mx-2">1. What comes to your mind when you hear "Emotional Intelligence"?</p>
    <v-card class="option-card d-flex pl-5 py-5 rounded-xl mt-5">
      <p class="options mx-auto text-center rounded">A</p>
      <v-card-text class="py-1 px-1 pl-3">Understanding and managing emotions</v-card-text>
    </v-card>
    <v-card class="option-card d-flex pl-5 py-5 rounded-xl mt-6">
      <p class="options mx-auto text-center rounded">B</p>
      <v-card-text class="py-1 px-1 pl-3">A secret code for happiness</v-card-text>
    </v-card>
    <v-card class="option-card d-flex pl-5 py-5 rounded-xl mt-6">
      <p class="options mx-auto text-center rounded">C</p>
      <v-card-text class="py-1 px-1 pl-3">Something I want to learn more about.</v-card-text>
    </v-card>
  </v-sheet>

  <!-- Previous and next button -->
  <v-sheet class="prev-and-next-button d-flex mx-4">
    <v-btn
      size="large"
      variant="outlined"
      color="#C0C0C0"
      class="rounded-pill text-capitalize px-7 elevation-0"
    >
      <img src="../assets/icons/arrow-left.svg" />
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn size="large" class="primary-button rounded-pill text-capitalize px-7">
      Next
      <img src="../assets/icons/arrow-right-white.svg" />
    </v-btn>
  </v-sheet>
</template>
<style scoped>
#quize-progress-bar {
  border: 0.06rem solid rgba(0, 0, 0, 0.15);
  padding: 0.06rem;
}
.prev-and-next-button {
  margin-top: 15vh;
}
.options {
  border: 2px solid black;
  height: 1.875rem;
  width: 1.875rem;
}
.option-card {
  border-radius: 1rem;
  border-bottom: 0.063rem solid rgba(0, 0, 0, 0.24);
  background: #f7f7f7;
  box-shadow:
    0px 4px 16px 0px rgba(255, 255, 255, 0.44) inset,
    0px 9px 5.8px -6px rgba(0, 0, 0, 0.04);
}
</style>
