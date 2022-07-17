<script lang="ts" setup>
import {onMounted, ref, computed, watchEffect, watch} from 'vue'
import {storeToRefs} from 'pinia'
import LearningItem from '@/components/LearningItem.vue'
import {useRoadmapStore} from "@/stores/roadmap";
import {Rename20Regular as NameIcon} from '@vicons/fluent'

const roadmapStore = useRoadmapStore()
const {myRoadmaps} = storeToRefs(roadmapStore)
onMounted(() => {
  roadmapStore.fetchAllRoadmaps()
  roadmapStore.fetchMyRoadmaps()
})

const createCustomModal = ref<boolean>(false)
const editCurrentModal = ref(false)
const bodyStyle = {
  width: '700px'
}
const loading = ref(false)

const newRoad = ref<{ name: string, items: any[] }>({name: '', items: []})
const addNewItem = () => newRoad.value.items.push({name: '', videos: 1, learnTime: 0})

const submitRoad = async () => {
  await roadmapStore.createNewRoadmap(newRoad.value)
  createCustomModal.value = false
}
const deleteLastItem = () => newRoad.value.items.pop()
const editValid = computed(() => roadmapStore.selectedRoadmap == null)

const submitRule = computed(() => newRoad.value.name != '' &&
    newRoad.value.items.length > 0 && newRoad.value.items[0].name != '')

</script>

<template>
  <div class="about">
    <n-space vertical>
      <n-space align="center">
        <n-button strong secondary round type="success" @click="createCustomModal = true">
          Create Roadmap
        </n-button>
        <n-button strong secondary round type="info" :disabled="editValid">
          Edit Current Roadmap
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
            <n-h3 v-else class="mb-0">{{ roadmapStore.sRoadmap.name }} ({{ roadmapStore.totalHours }} Hours)</n-h3>
          </template>
          <LearningItem v-for="item in roadmapStore.sRoadmap?.items ?? []" :key="item._id" :item="item"
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
                <n-button size="small" type="primary" round dashed @click="roadmapStore.setRoadmapItems">
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
      v-model:show="createCustomModal"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      title="Create Custom Roadmap"
      :bordered="true"
      size="huge"
  >
    <n-input placeholder="Enter Name" style="margin-bottom: 16px" v-model:value="newRoad.name">
      <template #prefix>
        <n-icon :component="NameIcon"/>
      </template>
    </n-input>
    <n-list bordered>
      <template #footer>
        <n-space justify="end">
          <n-button type="error" dashed @click="deleteLastItem">Delete Last</n-button>
          <n-button type="success" dashed @click="addNewItem">Add Another</n-button>
        </n-space>
      </template>
      <n-list-item v-for="item in newRoad.items">
        <n-input-group>
          <n-input v-model:value="item.name" :style="{ width: '50%' }" placeholder="Enter the Name"/>
          <n-input-number :min="1" v-model:value="item.videos" :style="{ width: '25%' }" placeholder="Videos"/>
          <n-input-number :min="0" v-model:value="item.learnTime" :style="{ width: '25%' }" placeholder="Duration"/>
        </n-input-group>
      </n-list-item>
    </n-list>

    <br>

    <n-button :disabled="!submitRule" type="success" @click="submitRoad">Submit</n-button>

  </n-modal>

  <n-modal
      v-model:show="editCurrentModal"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      title="Create Custom Roadmap"
      :bordered="true"
      size="huge"
  >
    <n-input placeholder="Enter Name" style="margin-bottom: 16px" v-model:value="newRoad.name">
      <template #prefix>
        <n-icon :component="NameIcon"/>
      </template>
    </n-input>
    <n-list bordered>
      <template #footer>
        <n-space justify="end">
          <n-button type="error" dashed @click="deleteLastItem">Delete Last</n-button>
          <n-button type="success" dashed @click="addNewItem">Add Another</n-button>
        </n-space>
      </template>
      <n-list-item v-for="item in newRoad.items">
        <n-input-group>
          <n-input v-model:value="item.name" :style="{ width: '50%' }" placeholder="Enter the Name"/>
          <n-input-number :min="1" v-model:value="item.videos" :style="{ width: '25%' }" placeholder="Videos"/>
          <n-input-number :min="0" v-model:value="item.learnTime" :style="{ width: '25%' }" placeholder="Duration"/>
        </n-input-group>
      </n-list-item>
    </n-list>

    <br>

    <n-button type="success">Submit</n-button>

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
