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
    learnTime: 10,
    workTime: 2,
    learnedTime: 2,
    videos: 3,
    roadmapId: "wqeasd",
    deleted: false
  },
  {
    id: "asbsasd",
    name: "CSS",
    learnTime: 12,
    learnedTime: 1,
    videos: 2,
    roadmapId: "wqeasd",
    deleted: false
  },
  {
    id: "asbsdasdas",
    name: "JavaScript",
    learnTime: 17,
    learnedTime: 0,
    videos: 5,
    roadmapId: "wqeasd",
    deleted: false
  },
]);

const totalHours = ref(0), watchedHours = ref(0), workHours = ref(0), workedHours = ref(0)
watchEffect(() => content.value.forEach((item) => totalHours.value += item.learnTime))
watchEffect(() => content.value.forEach((item) => watchedHours.value += (item?.learnedTime ?? 0)))
watchEffect(() => content.value.forEach((item) => workHours.value += item?.workTime ?? 0))
watchEffect(() => content.value.forEach((item) => workedHours.value += item?.workedTime ?? 0))
const totalVideos = computed(() => content.value.map((item) => item.videos).reduce((a, b) => (a ?? 0) + (b ?? 0), 0))

const makeComplete = ({itemId, value}) => {
  const item = content.value.find((i) => i.id === itemId)
  if (!item) return
  watchedHours.value = 0
  item.learnedTime = (value) ? item.learnTime : 0;
};

const addToWorked = ({itemId, value}) => {
  const item = content.value.find((i) => i.id === itemId)
  if (!item) return
  workedHours.value = 0
  console.log(item.workedTime ?? 0)
  console.log(value)
  item.workedTime = (item.workedTime ?? 0) + value
}

const addToLearned = ({itemId, value}) => {
  const item = content.value.find((i) => i.id === itemId)
  if (!item) return
  watchedHours.value = 0
  item.learnedTime = (item.learnedTime ?? 0) + value
}

const removeRoadmapItem = (itemId) => {
  const item = content.value.find((item) => item.id === itemId)
  if (!item) return
  item.deleted = !item.deleted
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
          <LearningItem v-for="item in content" :key="item.id" :item="item"
                        @makeComplete="makeComplete"
                        @removeItem="removeRoadmapItem"
                        @addToLearned="addToLearned"
                        @addToWorked="addToWorked"
          />
          <template #footer>
            <n-space justify="space-between" align="center">
              <n-h6 class="mb-0">
                <n-text :type="((workHours - workedHours) < (workHours/2)) ? 'success' : 'error'">Total Videos : {{
                    totalVideos
                  }} &numsp; |&numsp; Remaining Learning Hours :
                  {{ totalHours - watchedHours }}
                  &numsp; |&numsp; Remaining Working Hours: {{ workHours - workedHours }}
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
