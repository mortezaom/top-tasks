<template>
  <n-config-provider :theme="darkTheme">
    <n-dialog-provider>
      <n-message-provider>
        <RouterView/>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import {darkTheme} from "naive-ui";
</script>

<style>
@import '@/assets/base.css';
</style>
