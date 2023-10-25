<script setup lang="ts">
// import { storeToRefs } from 'pinia'
import { useAuthStore } from '../../stores/auth.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import loginImg from '../../assets/identity.svg'

// const { authToken } = storeToRefs(useAuthStore())

const { userLogin } = useAuthStore()
const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)

const login = async () => {
  await userLogin(username.value, password.value)
  const isAutheticated = authStore.isAuthenticated
  if (isAutheticated) {
    // Redirect to home page
    // Use replace to not enable the user to return to login route
    router.replace({ name: 'home' })
  }
}
</script>

<template>
  <v-container fluid>
    <v-row class="mb-3 mx-5">
      <v-col cols="12">
        <h1 class="heading-text">Open Llama</h1>
      </v-col>
    </v-row>
    <v-row class="mb-3 align-center">
      <v-col cols="12" md="6" class="mt-8 mb-4">
        <v-img :src="loginImg" class="login-img"></v-img>
      </v-col>
      <v-col class="mx-5 d-flex flex-column justify-center">
        <div class="form-container">
          <h5>Enter your company Email or Username</h5>
          <v-form @submit.prevent="login">
            <v-text-field
              class="input-fields"
              clearable
              type="text"
              density="compact"
              placeholder="Enter Username"
              variant="outlined"
              v-model.trim="username"
              rounded="lg"
            ></v-text-field>
            <h5>Enter your company Password</h5>

            <v-text-field
              class="input-fields"
              v-model.trim="password"
              variant="outlined"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append-inner="showPassword = !showPassword"
              density="compact"
              placeholder="Enter Password"
              rounded="lg"
            >
            </v-text-field>
            <div class="login-helpers">
              <v-checkbox
                label="Remember me"
                color="orange"
                hide-details
                class="checkbox"
              ></v-checkbox>
              <p class="forgot-password-btn">Forgot Password?</p>
            </div>
            <v-btn
              id="submit-login-details-button"
              class="d-flex text-capitalize my-8 mx-auto py-4 px-3 rounded-pill"
              type="submit"
              color="#F89854"
            >
              Login
            </v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500&family=Dosis:wght@700&display=swap');

* {
  margin: 0;
  padding: 0;
}

.login-img {
  max-width: 15rem;
}

@media (min-width: 768px) {
  .login-img {
    max-width: 40rem;
  }
}

@media (min-width: 768px) {
  .form-container {
    max-width: 70%;
    /* margin-left: auto;
    margin-right: auto; */
  }
}

#submit-login-details-button {
  font-family: 'Albert Sans', sans-serif;
  width: 12.8125rem;
  font-size: 1.25rem;
}

h5 {
  font-family: 'Albert Sans', sans-serif;
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.48125rem; /* 148.125% */
  letter-spacing: 0.045rem;
  margin-bottom: 0.7rem;
}
.heading-text {
  color: #000;
  font-family: 'Dosis', sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: 138.2%; /* 2.764rem */
  margin: 1rem 0;
}

.login-helpers {
  font-family: 'Albert Sans', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.forgot-password-btn {
  color: #d65a03;
}
</style>
