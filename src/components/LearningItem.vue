<script lang="ts" setup>
import {
  TimePicker24Filled as TimeIcon,
  PhoneScreenTime24Regular as WorkTimeIcon,
  Save24Regular as SaveIcon,
  Delete20Regular as DeleteIcon,
  ArrowUndo20Regular as UndoIcon
} from '@vicons/fluent'
import {computed, ref} from "vue";
import type {RoadmapItem} from "@/interfaces/RoadmapItem";
import {useRoadmapStore} from "@/stores/roadmap";

const roadmapStore = useRoadmapStore()

const learned = ref<number>(0);
const worked = ref<number>(0);
const {item} = defineProps<{ item: RoadmapItem }>()

const handleAddToLearned = () => roadmapStore.addToLearned({itemId: item.id, value: learned.value})
const handleAddToWorked = () => roadmapStore.addToWorked({itemId: item.id, value: worked.value})
const handleCheckedChange = (value: boolean) => roadmapStore.makeComplete({itemId: item.id, value})
const handleRemoveItem = () => roadmapStore.removeRoadmapItem(item.id)

const remainingLearnHours = computed(() => (item.learnTime ?? 0) - (item.learnedTime ?? 0))
const remainingWorkHours = computed(() => (item.workTime ?? 0) - (item.workedTime ?? 0))

</script>


<template>
  <n-list-item class="disable">
    <template #prefix>
      <n-checkbox @update:checked="handleCheckedChange" :disabled="(item.deleted ?? true)"></n-checkbox>
    </template>
    <n-thing justify="center" class="item-thing">
      <n-text :type="((item.deleted ?? false)) ? 'error' : 'default'" :delete="(item.deleted ?? false) ? true: false">
        {{ item.name }} &numsp; |&numsp; Videos: {{ item.videos }} &numsp;|&numsp;
        {{ remainingLearnHours }} Hours Left (Learn) &numsp;|&numsp;
        {{ remainingWorkHours }} Hours Left (Work)
      </n-text>
    </n-thing>
    <template #suffix>
      <n-space class="list-suffix">
        <n-tooltip :style="{ maxWidth: '400px' }" trigger="click">
          <template #trigger>
            <n-button strong secondary circle type="info">
              <template #icon>
                <n-icon>
                  <work-time-icon/>
                </n-icon>
              </template>
            </n-button>
          </template>

          <n-space>
            <n-input-number
                v-model:value="worked"
                placeholder="Enter worked time..."
                :min=" item?.workedTime - item?.workTime"
                :max="item?.workTime - item?.workedTime"
            />
            <n-button quaternary circle type="primary" @click="handleAddToWorked" :disabled="(item.deleted ?? true)">
              <template #icon>
                <n-icon>
                  <save-icon/>
                </n-icon>
              </template>
            </n-button>

          </n-space>
        </n-tooltip>
        <n-tooltip :style="{ maxWidth: '400px' }" trigger="click">
          <template #trigger>
            <n-button strong secondary circle type="info">
              <template #icon>
                <n-icon>
                  <time-icon/>
                </n-icon>
              </template>
            </n-button>
          </template>

          <n-space>
            <n-input-number
                v-model:value="learned"
                placeholder="Enter watched time..."
                :min="item?.learnedTime - item?.learnTime"
                :max="item?.learnTime - item?.learnedTime"
            />
            <n-button quaternary circle type="primary" @click="handleAddToLearned" :disabled="(item.deleted ?? true)">
              <template #icon>
                <n-icon>
                  <save-icon/>
                </n-icon>
              </template>
            </n-button>

          </n-space>
        </n-tooltip>
        <n-button strong secondary circle type="info" @click="handleRemoveItem">
          <template #icon>
            <n-icon>
              <delete-icon v-if="!(item?.deleted ?? false)"/>
              <undo-icon v-else/>
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </template>
  </n-list-item>
</template>

<style lang="scss">
</style>