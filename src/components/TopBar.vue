<script lang="ts" setup>
import {computed, ref, watch} from "vue"
import {useRoute, useRouter} from "vue-router"
import {NIcon} from "naive-ui"
import {
  Home48Regular as HomeIcon,
  DoorArrowRight28Regular as LogoutIcon,
  Person24Regular as AccountIcon,
  CloudSync28Regular as CloudSyncIcon
} from "@vicons/fluent"
import useApi from "@/utils/useApi";

const route = useRoute()
const router = useRouter()

const path = computed(() => route.path);
const breadcrumbs = ref<string[]>([])

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

watch(path, (newVal) => {
  breadcrumbs.value = newVal.split('/').filter((t) => t != '')
})

const handleLogout = () => {
  localStorage.removeItem("user")
  router.push("/auth")
}

const isSync = ref(true)
const value = ref(0)
const oldPass = ref('')
const newPass = ref('')
const passError = ref(false)
const changePass = async () => {
  const {
    error,
    data
  } = await useApi(`/api/v1/auth/changePass`).put({oldPass: oldPass.value, newPass: newPass.value}).json()
  console.log(error.value)
  if (error.value) {
    passError.value = true
  } else {
    passError.value = false
    localStorage.setItem('user', JSON.stringify(data.value))
  }
}
const changePassValid = computed(() => oldPass.value != '' && newPass.value != '')

</script>
<template>
  <n-layout-header bordered :style="'padding: 8px'">
    <n-space align="center" justify="space-between">
      <n-space align="center">
        <n-button @click="router.push('/')" quaternary circle>
          <template #icon>
            <n-icon>
              <home-icon/>
            </n-icon>
          </template>
        </n-button>
        <n-breadcrumb>
          <n-breadcrumb-item> Dashboard</n-breadcrumb-item>
          <n-breadcrumb-item v-for="item in breadcrumbs"> {{ capitalize(item) }}</n-breadcrumb-item>
        </n-breadcrumb>
      </n-space>
      <n-space align="center">
        <n-button @click.prevent="isSync = !isSync" strong secondary circle
                  :type="(isSync) ? 'success' : 'error'">
          <template #icon>
            <n-icon>
              <cloud-sync-icon/>
            </n-icon>
          </template>
        </n-button>
        <n-popover placement="bottom" trigger="click">
          <template #trigger>
            <n-button @click.prevent="" strong secondary circle type="info">
              <template #icon>
                <n-icon>
                  <account-icon/>
                </n-icon>
              </template>
            </n-button>
          </template>
          <n-button-group vertical>

            <n-popover trigger="click" placement="left">
              <template #trigger>
                <n-button style="min-width: 200px;" ghost>
                  Change Password
                </n-button>
              </template>
              <n-space justify="center">
                <n-input type="password" v-model:value="oldPass" placeholder="Old Password"/>
                <n-input type="password" v-model:value="newPass" placeholder="New Password"/>
                <n-button secondary :type="passError ? 'error' :'success'" @click="changePass" :disabled="!changePassValid">
                  Change
                </n-button>
              </n-space>
            </n-popover>
            <n-button style="min-width: 200px;" ghost>
              Change daily hours
            </n-button>
          </n-button-group>
        </n-popover>
        <n-button strong secondary circle type="error" @click="handleLogout">
          <template #icon>
            <n-icon>
              <logout-icon/>
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </n-space>
  </n-layout-header>
</template>