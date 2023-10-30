<script setup lang="ts">
import { useAuthStore } from '../../stores/auth.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isMobile } from '../../utilities/helper.ts'
import loginImg from '../../assets/images/login-img.svg'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const showSnackbar = ref(false)

const login = async () => {
  if (username.value === '' && password.value === '') {
    return
  }
  await authStore.userLogin(username.value, password.value, router)

  if (authStore.isAuthenticated()) {
    router.replace({ name: 'home' })
  } else {
    console.error('Authentication Failed!')
    showSnackbar.value = true // Show snackbar when authentication fails
  }
}

const usernameValidation = [(username: any) => !!username || 'Username is required']
const passwordValidation = [(password: any) => !!password || 'Password is required']
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row class="mx-5 my-2" v-if="isMobile()">
      <v-col cols="12">
        <h1 class="heading-text">{{ $t('OpenLlama') }}</h1>
      </v-col>
    </v-row>

    <v-row class="mb-3 align-center mt-4">
      <v-col cols="12" md="6">
        <v-img :src="loginImg" class="login-img"></v-img>
      </v-col>

      <v-col class="mx-5 d-flex flex-column">
        <v-row class="mb-4" v-if="!isMobile()">
          <v-col>
            <h1 class="heading-text">{{ $t('OpenLlama') }}</h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-sheet max-width="600">
              <p class="mb-2">{{ $t('EnterUsername') }}</p>
              <v-form @submit.prevent="login">
                <v-text-field
                  clearable
                  type="text"
                  density="compact"
                  :placeholder="$t('Username')"
                  variant="outlined"
                  v-model.trim="username"
                  rounded="lg"
                  :rules="usernameValidation"
                ></v-text-field>
                <p class="mb-2">{{ $t('EnterPassword') }}</p>

                <v-text-field
                  v-model.trim="password"
                  variant="outlined"
                  :type="showPassword ? 'text' : 'password'"
                  density="compact"
                  :placeholder="$t('Password')"
                  rounded="lg"
                  :rules="passwordValidation"
                >
                  <template v-slot:append-inner>
                    <i
                      :class="`isax ${showPassword ? 'isax-eye' : 'isax-eye-slash'} pointer`"
                      @click="showPassword = !showPassword"
                    >
                    </i>
                  </template>
                </v-text-field>
                <div class="d-flex flex-row justify-center align-center">
                  <v-checkbox :label="$t('RememberMe')" color="orange" hide-details></v-checkbox>
                  <p class="forgot-password-btn">{{ $t('ForgotPassword') }}</p>
                </div>

                <v-btn
                  id="submit-login-details-button"
                  class="d-flex text-capitalize my-2 mx-auto py-4 px-3 rounded-pill"
                  type="submit"
                  color="var(--btn-color)"
                >
                  Login
                </v-btn>
              </v-form>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div>
      <v-snackbar v-model="showSnackbar" color="var(--btn-color)">
        {{ $t('InvalidCredentials') }}
        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="showSnackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<style scoped>
#submit-login-details-button {
  width: 13rem;
  font-size: 1.25rem;
  color: white !important;
}

p {
  color: #000;
  font-size: 1rem;
  letter-spacing: 0.045rem;
}
.heading-text {
  color: var(--text-color);
  font-family: 'Dosis', sans-serif;
}

.forgot-password-btn {
  color: var(--link-color);
}

.login-img {
  max-width: 15rem;
}

@media (min-width: 768px) {
  .login-img {
    max-width: 40rem;
  }
}
@media (min-width: 600px) and (max-width: 768px) {
  .login-img {
    max-width: 25rem;
  }
}
</style>
