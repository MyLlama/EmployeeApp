<script setup lang="ts"></script>
<template>
  <v-row>
    <v-col>
      <p class="pa-5">In-progress tasks</p>

      <v-card class="mx-4 rounded-xl py-3" id="learning-module-card">
        <v-breadcrumbs :items="['Foo', 'Bar', 'Fizz']">
          <template v-slot:divider>
            <VsxIcon class="mt-2" iconName="ArrowRight2" :size="20" type="linear" />
          </template>
        </v-breadcrumbs>
        <v-row>
          <v-col>
            <v-card-title>Course Orientations</v-card-title>
            <v-card-item>
              <VsxIcon iconName="Paperclip2" class="mr-2" :size="18" type="linear" />
              <span class="pb-1">Meeting</span>
            </v-card-item>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-card-item class="d-flex justify-end">
              <v-chip color="" class="bg-white text-body-2" size="x-small" label> PM </v-chip>
              <p class="text-h5 text-sm-h4 mt-2">12:00</p>
            </v-card-item>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-row>
          <v-col>
            <v-card-text>20/40 Attempted</v-card-text>
            <v-card-item>
              <v-progress-linear
                color="red"
                model-value="20"
                rounded
                height="11"
              ></v-progress-linear>
            </v-card-item>
          </v-col>

          <v-col>
            <v-card-item class="d-flex justify-end">
              <v-btn class="btnwss rounded-xl" color="orange"> Complete </v-btn>
            </v-card-item>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
#learning-module-card {
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.04);
}

.btnwss {
  color: white !important;
}
</style>
