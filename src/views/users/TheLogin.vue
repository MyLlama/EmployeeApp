<script setup lang="ts">
// import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../stores/auth.js'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

// const { isLoggedIn, authToken } = storeToRefs(useAuthStore())
// Not using the state directly here and accessing it using getters but can do so
const { login } = useAuthStore()
const authStore = useAuthStore()
const router = useRouter()

const inputData = reactive({
  username: '',
  password: ''
})
const submitForm = () => {
  login(inputData.username, inputData.password)
  console.log('Form Submitted!')
  const isAutheticated = authStore.getLoginStatus
  if (isAutheticated) {
    // Redirect to home page
    // Use replace to not enable the user to return to login route
    router.replace({ name: 'home' })
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="Please Enter Your Username"
        v-model.trim="inputData.username"
      />
    </div>
    <div>
      <label for="password">Password</label>
      <input
        id="password"
        type="text"
        placeholder="Please Enter Your Password"
        v-model.trim="inputData.password"
      />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
