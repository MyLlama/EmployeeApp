<script setup lang="ts">
import { useAuthStore } from '../../stores/auth.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { helper } from '../../utilities/helper.ts'
import loginImg from '../../assets/images/login-img.svg'

const { userLogin } = useAuthStore()
const { isMobile } = helper()
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

// Validation for username and password using vuetify
// we define two refs which hold array of validation rules.
// The first ref for username validation contains single validation function if the entered username(parameter) is truthy (not null, undefined, or empty string), the function returns true and validation passes
// The array of second ref contain two validation rules which check for truthines of password and its length if it greater than 6

const usernameValidation = ref([(username: any) => !!username || 'Username is required'])
const passwordValidation = ref([
  (password: any) => !!password || 'Password is required',
  (password: string | any[]) =>
    (password && password.length >= 6) || 'Password must be at least 6 characters long'
])
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row class="mb-3 mx-5" v-if="isMobile()">
      <v-col cols="12">
        <h1 class="heading-text">Open Llama</h1>
      </v-col>
    </v-row>
    <v-row class="mb-3 align-center">
      <v-col cols="12" md="6" class="mt-8 mb-4">
        <v-img :src="loginImg" class="login-img"></v-img>
      </v-col>
      <v-col class="mx-5 d-flex flex-column">
        <v-row class="mb-4">
          <v-col>
            <h1 v-if="!isMobile()" class="heading-text">{{ $t('Open Llama') }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <!-- <div class="form-container"> -->
            <v-sheet max-width="600">
              <h5>{{ $t('Enter your Username') }}</h5>
              <v-form @submit.prevent="login">
                <v-text-field
                  class="input-fields"
                  clearable
                  type="text"
                  density="compact"
                  :placeholder="$t('Enter Username')"
                  variant="outlined"
                  v-model.trim="username"
                  rounded="lg"
                  :rules="usernameValidation"
                ></v-text-field>
                <h5>{{ $t('Enter your Password') }}</h5>

                <v-text-field
                  class="input-fields"
                  v-model.trim="password"
                  variant="outlined"
                  :type="showPassword ? 'text' : 'password'"
                  density="compact"
                  :placeholder="$t('Enter Password')"
                  rounded="lg"
                  :rules="passwordValidation"
                >
                  <template v-slot:append-inner>
                    <i
                      class="isax isax-eye pointer"
                      v-if="showPassword"
                      @click="showPassword = !showPassword"
                    >
                    </i>
                    <i
                      class="isax isax-eye-slash pointer"
                      v-else
                      @click="showPassword = !showPassword"
                    ></i>
                  </template>
                </v-text-field>
                <div class="d-flex flex-row justify-center align-center">
                  <v-checkbox
                    :label="$t('Remember me')"
                    color="orange"
                    hide-details
                    class="checkbox"
                  ></v-checkbox>
                  <p class="forgot-password-btn">{{ $t('Forgot Password?') }}</p>
                </div>
                <v-btn
                  id="submit-login-details-button"
                  class="d-flex text-capitalize my-8 mx-auto py-4 px-3 rounded-pill"
                  type="submit"
                  color="var(--btn-color)"
                >
                  Login
                </v-btn>
              </v-form>
            </v-sheet>
            <!-- </div> -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
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

#submit-login-details-button {
  width: 12.8125rem;
  font-size: 1.25rem;
  color: white !important;
}

h5 {
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

.forgot-password-btn {
  color: var(--link-color);
}
</style>
