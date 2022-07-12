<script setup lang="ts">
import SideBar from "./components/SideBar.vue";
import TopBar from "./components/TopBar.vue";

</script>

<template>
  <n-space vertical>
    <n-layout>
      <n-layout has-sider>
        <side-bar/>
        <n-layout style="min-height: 100vh">
          <top-bar/>
          <div class="content-con">
            <RouterView/>
          </div>
        </n-layout>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<style>
.content-con {
  padding: 24px 36px;
}
</style>
