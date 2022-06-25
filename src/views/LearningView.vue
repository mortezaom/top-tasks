<script lang="ts" setup>
import {computed, ref, watchEffect} from 'vue'
import LearningItem from '@/components/LearningItem.vue'
import type {RoadmapItem} from "@/interfaces/RoadmapItem";

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

const content = ref<RoadmapItem[]>([
  {
    id: "asbs",
    name: "Html",
    totalTime: 10,
    watchedTime: 2,
    videos: 3,
    roadmapId: "wqeasd",
    isOptional: false
  },
  {
    id: "asbsasd",
    name: "CSS",
    totalTime: 12,
    watchedTime: 1,
    videos: 2,
    roadmapId: "wqeasd",
    isOptional: false
  },
  {
    id: "asbsdasdas",
    name: "JavaScript",
    totalTime: 17,
    watchedTime: 0,
    videos: 5,
    roadmapId: "wqeasd",
    isOptional: false
  },
]);
const totalHours = ref(0);
const watchedHours = ref(0)
watchEffect(() => content.value.forEach((item) => totalHours.value += item.totalTime))
watchEffect(() => content.value.forEach((item) => watchedHours.value += (item?.watchedTime ?? 0)))
const completedPercent = computed(() => Math.round(watchedHours.value * 100 / totalHours.value))

const makeComplete = ({itemId, value}) => {
  const item = content.value.find((i) => i.id === itemId)
  if (!item) return
  watchedHours.value = 0
  item.watchedTime = (value) ? item.totalTime : 0;
};

const removeRoadmapItem = (itemId) => {
  const item = content.value.find((item) => item.id === itemId)
  if (!item) return
  item.deleted = true
}

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
            <n-h3 class="mb-0">Learning: Android ({{ totalHours }} Hours)</n-h3>
          </template>
          <LearningItem v-for="item in content" :key="item.id" :item="item" @makeComplete="makeComplete"
                        @removeItem="removeRoadmapItem"/>
          <template #footer>
            <n-space justify="space-between" align="center">
              <n-h6 class="mb-0">
                <n-text :type="(completedPercent > 50) ? 'success' : 'error'">Total Hours Watched : {{
                    watchedHours
                  }} &numsp; |&numsp; Remaining Hours :
                  {{ totalHours - watchedHours }}
                  &numsp; |&numsp; Completed: {{ completedPercent }}%
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
