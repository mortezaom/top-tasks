<script lang="ts" setup>
import {type Component, computed, h, ref} from "vue"
import {useRoute, useRouter} from "vue-router"
import {type MenuOption, NIcon} from "naive-ui"
import {
  Board24Regular as DashboardIcon,
  LearningApp20Regular as LearningIcon,
  TaskListSquareRtl24Regular as TasksIcon,
  NotePin20Regular as ReportIcon,
  TextParagraphDirection20Regular as DirectionIcon
} from "@vicons/fluent"
import useApi from "@/utils/useApi";

const route = useRoute()
const router = useRouter()

const currentRoute = computed(() => route.name?.toString() ?? '')
const showModal = ref(false)
const reportText = ref(``)
const direction = ref(true)
const sending = ref<boolean | null>(false)
const errorText = ref<string | null>(null)
const click = (k: string) => {
  if (k == 'report') {
    showModal.value = true
  } else if (k.startsWith('/')) {
    router.push(k)
  } else {
    router.push({name: k})
  }
};
const submitReport = async () => {
  sending.value = true
  errorText.value = null
  const {
    error,
    data
  } = await useApi(`/api/v1/reports/`).post({text: reportText.value}).json()
  console.log(error.value)
  sending.value = null
  if (error.value) {
    errorText.value = error.value
  } else {
    setTimeout(() => {
      reportText.value = ``
      showModal.value = false
      sending.value = false
      errorText.value = null
    }, 2000)
  }
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, {default: () => h(icon)});
}

const tasksCats = [
  {name: "Website", id: '12312312'},
  {name: "Android App", id: '312123123'},
  {name: 'Api system', id: '12323123'},
]

const menuOptions: MenuOption[] = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: renderIcon(DashboardIcon),
  },
  {
    label: "Learning",
    icon: renderIcon(LearningIcon),
    key: "learning",
  },
  {
    label: "Tasks",
    icon: renderIcon(TasksIcon),
    key: "tasks",
    children: [
      {
        label: "Today",
        key: '/tasks/today',
      },
      ...tasksCats.map((item) => {
        return {label: item.name, key: `/tasks/${item.id}`}
      })
    ],
  },
  {
    label: "Report",
    icon: renderIcon(ReportIcon),
    key: "report",
  },
]

const path = computed(() => route.path);

</script>
<template>
  <n-layout-sider collapse-mode="width" :collapsed-width="48" :width="256" :native-scrollbar="false"
                  style="min-height: 100vh" show-trigger="bar">
    <router-link to="/" #="{ navigate, href }" custom>
      <n-a class="logo" :href="href" @click="navigate">
        <span>Top Tasks</span>
      </n-a>
    </router-link>
    <n-menu :collapsed-width="48" :collapsed-icon-size="28" :options="menuOptions"
            :value="(currentRoute != 'tasks') ? currentRoute : path" @update:value="k => { click(k) }"/>
  </n-layout-sider>
  <n-modal v-model:show="showModal">
    <n-card
        style="width: 600px"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-space vertical>
        <n-space horizontal justify="space-between">
          <n-h2>Submit a report</n-h2>
          <n-button quaternary circle type="info" @click="direction = !direction">
            <template #icon>
              <n-icon>
                <direction-icon/>
              </n-icon>
            </template>
          </n-button>
        </n-space>
        <n-input
            type="textarea"
            rows="6"
            placeholder=""
            v-model:value="reportText"
            :input-props="{ dir: direction ? 'rtl' : 'ltr' }"
        />
        <n-space horizontal justify="space-between" align="center">
          <n-button type="primary" :disabled="reportText == ''" @click="submitReport">
            Submit Report
          </n-button>
          <n-text v-if="errorText != null" type="error" strong>{{ errorText }}</n-text>
          <n-progress
              v-else-if="sending == true"
              style="width: 30px"
              type="circle"
              :show-indicator="false"
              status="success"
              :percentage="20"
              :processing="true"
              class="progress"
          />
          <n-text v-else-if="sending == null" type="Success" strong>Done !</n-text>
        </n-space>
      </n-space>
    </n-card>
  </n-modal>
</template>
<style lang="scss">
.logo {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--color);
  font-size: 1.5em;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  transition: padding 0.3s cubic-bezier(0.4, 0, 0.2, 1),
  font-size 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.n-layout-sider--collapsed .logo {
  padding: 8px;
  font-size: 0;
}

.logo svg {
  flex: 0 0 32px;
  height: 32px;
  margin-right: 12px;
  transition: margin 0.3s var(--bezier);
}

.n-layout-sider--collapsed .logo svg {
  margin-right: 0;
}

.progress {
  animation: spin .7s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>