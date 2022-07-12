<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useFetch } from '@vueuse/core'
import { useRouter } from 'vue-router';

const router = useRouter()

const username = ref<string>('')
const password = ref<string>('')
const serverAddress = import.meta.env.VITE_SERVER_ADDRESS
const err = ref<string | null>(null)
const handleLogin = async () => {
  const { error, data } = await useFetch(`/api/v1/auth/login`).post({ username: username.value, password: password.value }).json()
  if (error.value == null) {
    localStorage.setItem("user", JSON.stringify(data.value))
    await router.push("/")
  } else {
    err.value = error.value
  }
}

const isValid = computed(() => username.value !== '' && password.value !== '')

</script>

<template>
  <n-space justify="center" align="center" class="auth-view">
    <n-card class="n-card" hoverable>
      <n-space vertical>
        <n-h2>
          <n-text strong type="success">Login</n-text>
        </n-h2>
        <n-input v-model:value="username" type="text" placeholder="Username" clearable />

        <n-input v-model:value="password" type="password" show-password-on="click" placeholder="Password"
          :maxlength="10" />
        <br>
        <n-button type="primary" dashed @click="handleLogin" :disabled="!isValid">
          Login
        </n-button>
      </n-space>
    </n-card>
  </n-space>
</template>

<style lang="scss">
.auth-view {
  min-height: 100vh;
  min-width: 100vw;

  .n-card {
    padding-top: 20px;
    padding-bottom: 30px;
    min-width: 500px;
  }
}
</style>