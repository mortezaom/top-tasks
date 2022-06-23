<script setup lang="ts">
import { computed, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()

const id = computed(() => route.path.split('/').reverse()[0]);

</script>
<template>
    <div class="about">
        <h1>This is Tasks page {{ id }}</h1>
    </div>
</template>

<style>
</style>
