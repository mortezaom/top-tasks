<script lang="ts" setup>
import {ref} from 'vue'
import {Timer20Regular as TimeIcon, Save24Regular as SaveIcon, Delete20Regular as DeleteIcon} from '@vicons/fluent'

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

const list1 = [
  {
    title: "Introduction"
  }
];
const selectedValue = ref<string|null>(null);
const value = ref<number|null>(null);
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
            <n-h3 class="mb-0">Learning: Android (34 Hours)</n-h3>
          </template>
          <template #footer>
            fff
          </template>
          <n-list-item class="item-finished">
            <template #prefix>
              <n-checkbox></n-checkbox>
            </template>
            <n-thing justify="center" class="item-thing">
              HTML &numsp; |&numsp; Videos: 2 &numsp; |&numsp; 76% Completed &numsp;|&numsp; 2 Hours Left
            </n-thing>
            <template #suffix>
              <n-space class="list-suffex">
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
                        :max="24"
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
                      <delete-icon/>
                    </n-icon>
                  </template>
                </n-button>
              </n-space>
            </template>
          </n-list-item>
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

.list-suffex {
  flex-flow: nowrap !important;
}
</style>
