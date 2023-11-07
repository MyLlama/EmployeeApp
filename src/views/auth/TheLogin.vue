<script setup lang="ts">
import { useAuthStore } from '../../stores/auth.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import loginImg from '../../assets/images/login_img.svg'

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
    <v-row class="mx-0 vertical-center-desktop">
      <v-col cols="12" md="6">
        <!-- Image with Horizontal Centering for Mobile -->
        <div class="d-flex justify-center d-md-none mt-12">
          <v-img :src="loginImg" class="login-img"></v-img>
        </div>
        <!-- Image without centering for Desktop -->
        <div class="d-none d-md-flex mx-8">
          <v-img :src="loginImg" class="login-img"></v-img>
        </div>
      </v-col>

      <v-col class="d-flex flex-column mx-3">
        <v-row class="my-auto">
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
                    <img
                      v-if="showPassword"
                      src="../../assets/icons/eye-icon.svg"
                      @click="showPassword = !showPassword"
                    />
                    <img
                      v-else
                      src="../../assets/icons/profile-icon.svg"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </v-text-field>
                <div class="d-flex flex-row justify-center align-center">
                  <v-checkbox :label="$t('RememberMe')" color="orange" hide-details></v-checkbox>
                  <p class="forgot-password-btn">{{ $t('ForgotPassword') }}</p>
                </div>

                <BaseButton
                  id="submit-login-details-button"
                  buttonClass="d-flex text-capitalize my-6 mx-auto rounded-pill"
                  type="submit"
                >
                  Login
                </BaseButton>
              </v-form>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div>
      <v-snackbar v-model="showSnackbar" color="var(--button-danger)">
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
  border: 1px solid var(--button-primary, #ff6839);
  background: radial-gradient(
      92.93% 98.54% at 18.36% -18.51%,
      rgba(0, 0, 0, 0.16) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      94.6% 106.8% at 71.33% 102.3%,
      rgba(255, 255, 255, 0.35) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    var(--button-primary, #ff6839);
  box-shadow: 0px 9px 8px -3px rgba(237, 77, 24, 0.28);
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
  max-width: 20rem;
}

@media (min-width: 768px) {
  .login-img {
    max-width: 40rem;
  }
  .vertical-center-desktop {
    margin-top: 20vh;
  }
}
@media (min-width: 600px) and (max-width: 768px) {
  .login-img {
    max-width: 25rem;
  }
}
</style>
