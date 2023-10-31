<script setup lang="ts">
import { getViewsList } from '../utilities/helper'
const views = getViewsList()
</script>

<template>
  <v-navigation-drawer permanent>
    <v-list nav>
      <v-list-item v-for="view in views" :key="view.name" :title="$t(view.name)" :value="view.name">
        <template v-slot:prepend>
          <VsxIcon :iconName="view.icon" :size="20" type="linear" class="mx-2" />
        </template>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-divider></v-divider>
        <v-list>
          <v-list-item title="Setting">
            <template v-slot:prepend>
              <VsxIcon iconName="Setting2" :size="20" type="linear" class="mx-2" />
            </template>
          </v-list-item>
        </v-list>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.isax {
  margin-right: 12px;
}
</style>
