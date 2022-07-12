<script lang="ts" setup>
import {onMounted, ref, computed, watchEffect, watch} from 'vue'
import { storeToRefs } from 'pinia'
import LearningItem from '@/components/LearningItem.vue'
import {useRoadmapStore} from "@/stores/roadmap";
import {Rename20Regular as NameIcon} from '@vicons/fluent'

const roadmapStore = useRoadmapStore()
const { myRoadmaps } = storeToRefs(roadmapStore)
onMounted(() => {
  roadmapStore.fetchAllRoadmaps()
  roadmapStore.fetchMyRoadmaps()
})

const selectedPreRoad = ref<string | null>(null)

const selectedRoadmap = ref<string | null>(null);

const createModal = ref<boolean>(false)
const bodyStyle = {
  width: '700px'
}
const loading = ref(false)
const selectedValues = ref<string | null>(null)

const roadName = ref('')


</script>

<template>
  <div class="about">
    <n-space vertical>
      <n-space align="center">
        <n-button strong secondary round type="success" @click="createModal = true">
          Create Roadmap
        </n-button>
        <n-button strong secondary round type="success">
          Create Roadmap (Custom)
        </n-button>
        <n-select
            filterable
            placeholder="Select a roadmap"
            :options="myRoadmaps"
            label-field="name"
            value-field="_id"
            rounded
            @change="roadmapStore.changeCurrent"
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
            <n-space v-if="roadmapStore.sRoadmap == null" align="center" style="height: 150px">
              <n-h3 class="mb-0">
                <n-text type="warning" strong>Please Select a Roadmap first</n-text>
              </n-h3>
            </n-space>
            <n-h3 v-else class="mb-0">Learning: Android ({{ roadmapStore.totalHours }} Hours)</n-h3>
          </template>
          <LearningItem v-for="item in roadmapStore.sRoadmap?.items ?? []" :key="item.id" :item="item"
          />
          <template #footer v-if="roadmapStore.sRoadmap != null">
            <n-space justify="space-between" align="center">
              <n-h6 class="mb-0">
                <n-text
                    :type="((roadmapStore.workHours - roadmapStore.workedHours) < (roadmapStore.workHours/2)) ? 'success' : 'error'">
                  Total Videos : {{
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

  <n-modal
      v-model:show="createModal"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      title="Create Roadmap"
      :bordered="true"
      size="huge"
  >
    <n-h4>
      <n-text strong>Choose template</n-text>
    </n-h4>
    <n-select
        v-model:value="selectedValues"
        filterable
        placeholder="Search for roadmap"
        :options="options"
        :loading="loading"
        clearable
        remote
        :clear-filter-after-select="false"
        @search="handleSearch"
    />
    <n-h3 v-if="selectedItem == null">
      <n-text type="error" strong>Nothing selected</n-text>
    </n-h3>
    <n-list bordered style="margin: 16px auto">
      <n-list-item v-for="item in (selectedPreRoad?.items ?? [])" :key="item.id">
        <n-text>
          {{ item.name }} &numsp; |&numsp; Videos: {{ item.videos }} &numsp; |&numsp; Time: {{ item.learnTime }}
        </n-text>
      </n-list-item>
    </n-list>
    <n-input placeholder="Enter Name ( Blank for parent name )" style="margin-bottom: 16px" v-model:value="roadName">
      <template #prefix>
        <n-icon :component="NameIcon"/>
      </template>
    </n-input>

    <n-button :disabled="selectedPreRoad==null" type="success">Submit</n-button>

  </n-modal>
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
