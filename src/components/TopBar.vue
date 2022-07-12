<script lang="ts" setup>
import { computed, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { NIcon } from "naive-ui"
import {
    Home48Regular as HomeIcon,
    DoorArrowRight28Regular as LogoutIcon,
    Alert32Regular as AlertsIcon,
    CloudSync28Regular as CloudSyncIcon

} from "@vicons/fluent"
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

let isSync = ref(true)
let value = ref(0)

</script>
<template>
    <n-layout-header bordered :style="'padding: 8px'">
        <n-space align="center" justify="space-between">
            <n-space align="center">
                <n-button @click="router.push('/')" quaternary circle>
                    <template #icon>
                        <n-icon>
                            <home-icon />
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
                            <cloud-sync-icon />
                        </n-icon>
                    </template>
                </n-button>
                <n-badge :show="value > 0" dot>
                    <n-button @click.prevent="(value > 0) ? --value : ++value" strong secondary circle type="info">
                        <template #icon>
                            <n-icon>
                                <alerts-icon />
                            </n-icon>
                        </template>
                    </n-button>
                </n-badge>
                <n-button strong secondary circle type="error" @click="handleLogout">
                    <template #icon>
                        <n-icon>
                            <logout-icon />
                        </n-icon>
                    </template>
                </n-button>
            </n-space>
        </n-space>
    </n-layout-header>
</template>