<script lang="ts" setup>
import {TimePicker24Filled as TimeIcon, Save24Regular as SaveIcon, Delete20Regular as DeleteIcon} from '@vicons/fluent'
import {computed, ref} from "vue";
import type {RoadmapItem} from "@/interfaces/RoadmapItem";

const value = ref<number | null>(null);

const {item} = defineProps<{
  item?: RoadmapItem
}>();
const emits = defineEmits(['makeComplete', 'removeItem'])
const completed = computed(() => Math.round(((item?.watchedTime ?? 0) / (item?.totalTime ?? 1)) * 100))
const remainingHours = computed(() => (item?.totalTime ?? 0) - (item?.watchedTime ?? 0))

const handleCheckedChange = (value: boolean) => emits('makeComplete', {itemId: item?.id, value })
const handleRemoveItem = () => emits('removeItem' , item?.id)
</script>


<template>
  <n-list-item>
    <template #prefix>
      <n-checkbox @update:checked="handleCheckedChange"></n-checkbox>
    </template>
    <n-thing justify="center" class="item-thing">
      {{ item.name }} &numsp; |&numsp; Videos: {{ item.videos }} &numsp; |&numsp; {{ completed }}% Completed &numsp;|&numsp;
      {{ remainingHours }} Hours Left
    </n-thing>
    <template #suffix>
      <n-space class="list-suffix">
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
                v-model:value="value"
                placeholder="Enter watched time..."
                :min="0"
                :max="item.totalTime"
            />
            <n-button quaternary circle type="primary">
              <template #icon>
                <n-icon>
                  <save-icon/>
                </n-icon>
              </template>
            </n-button>

          </n-space>
        </n-tooltip>
        <n-button strong secondary circle type="info">
          <template #icon>
            <n-icon>
              <delete-icon @click="handleRemoveItem" />
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </template>
  </n-list-item>
</template>

<style lang="scss">

</style>