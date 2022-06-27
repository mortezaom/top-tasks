<script lang="ts" setup>
import {ref} from 'vue'
import LearningItem from '@/components/LearningItem.vue'
import {useRoadmapStore} from "@/stores/roadmap";

const roadmapStore = useRoadmapStore()

const options = [
  {
    label: 'Android Roadmap',
    value: 'android'
  },
  {
    label: 'Front-End Roadmap',
    value: 'front'
  },
  {
    label: "Back-end Roadmap",
    value: 'backend'
  }
]

const selectedValue = ref<string | null>(null);

</script>

<template>
  <div class="about">
    <n-space vertical>
      <n-space align="center">
        <n-button strong secondary round type="success">
          Create Roadmap
        </n-button>
        <n-button strong secondary round type="success">
          Create Roadmap (Custom)
        </n-button>
        <n-select
            v-model:value="selectedValue"
            filterable
            placeholder="Select a roadmap"
            :options="options"
            rounded
        />
      </n-space>

      <n-card size="small">
        <template #header>
          <n-h2 class="mb-0">
            <n-text type="info">Current Roadmap</n-text>
          </n-h2>
        </template>
        <n-list bordered>
          <template #header>
            <n-h3 class="mb-0">Learning: Android ({{ roadmapStore.totalHours }} Hours)</n-h3>
          </template>
          <LearningItem v-for="item in roadmapStore.rItems" :key="item.id" :item="item"
          />
          <template #footer>
            <n-space justify="space-between" align="center">
              <n-h6 class="mb-0">
                <n-text :type="((roadmapStore.workHours - roadmapStore.workedHours) < (roadmapStore.workHours/2)) ? 'success' : 'error'">Total Videos : {{
                    roadmapStore.totalVideos
                  }} &numsp; |&numsp; Remaining Learning Hours :
                  {{ roadmapStore.totalHours - roadmapStore.watchedHours }}
                  &numsp; |&numsp; Remaining Working Hours: {{ roadmapStore.workHours - roadmapStore.workedHours }}
                </n-text>
              </n-h6>
              <n-space>
                <n-button size="small" type="primary" round dashed>
                  <n-text type="primary" strong>Save Changes</n-text>
                </n-button>
              </n-space>
            </n-space>
          </template>
        </n-list>
      </n-card>
    </n-space>
  </div>
</template>

<style lang="scss">
.item-thing {
  position: relative;

  .background {
    background-color: #ffffff;
    height: 100%;
    position: absolute;
    width: 100%;
  }
}

.list-suffix {
  flex-flow: nowrap !important;
}
</style>
