<script setup lang="ts">
import { getViewsList } from '../utilities/helper'
import { useRouter } from 'vue-router'
import { VNavigationDrawer, VList, VListItem, VDivider } from 'vuetify/components'

const views = getViewsList()
const router = useRouter()
</script>

<template>
  <v-navigation-drawer permanent>
    <v-list nav>
      <v-list-item
        v-for="view in views"
        :key="view.name"
        :title="$t(view.name)"
        :value="view.name"
        @click="router.push(view.route)"
      >
        <template v-slot:prepend>
          <img style="height: 21px" :src="view.icon" class="mx-2" />
        </template>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-divider></v-divider>
        <v-list>
          <v-list-item title="Setting">
            <template v-slot:prepend>
              <img style="height: 21px" src="../assets/icons/setting-icon.svg" class="mx-2" />
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
