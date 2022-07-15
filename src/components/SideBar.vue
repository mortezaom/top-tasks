<script lang="ts" setup>
import { type Component, computed, h } from "vue"
import { useRoute, useRouter } from "vue-router"
import { type MenuOption, NIcon } from "naive-ui"
import {
    Board24Regular as DashboardIcon,
    LearningApp20Regular as LearningIcon,
    TaskListSquareRtl24Regular as TasksIcon
} from "@vicons/fluent"

const route = useRoute()
const router = useRouter()

const currentRoute = computed(() => route.name?.toString() ?? '')
const click = (k: string) => {
    if (k.startsWith('/')) {
        router.push(k)
    } else {
        router.push({ name: k })

    }
};

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const tasksCats = [
    { name: "Website", id: '12312312' },
    { name: "Android App", id: '312123123' },
    { name: 'Api system', id: '12323123' },
]

const menuOptions: MenuOption[] = [
    {
        label: "Dashboard",
        key: "dashboard",
        icon: renderIcon(DashboardIcon),
    },
    {
        label: "Learning",
        icon: renderIcon(LearningIcon),
        key: "learning",
    },
    {
        label: "Tasks",
        icon: renderIcon(TasksIcon),
        key: "tasks",
        children: [
            {
                label: "Today",
                key: '/tasks/today',
            },
            ...tasksCats.map((item) => { return { label: item.name, key: `/tasks/${item.id}` } })
        ],
    },
]

const path = computed(() => route.path);

</script>
<template>
    <n-layout-sider collapse-mode="width" :collapsed-width="48" :width="256" :native-scrollbar="false"
        style="min-height: 100vh" show-trigger="bar">
        <router-link to="/" #="{ navigate, href }" custom>
            <n-a class="logo" :href="href" @click="navigate">
                <span>Top Tasks</span>
            </n-a>
        </router-link>
        <n-menu :collapsed-width="48" :collapsed-icon-size="28" :options="menuOptions"
            :value="(currentRoute != 'tasks') ? currentRoute : path" @update:value="k => { click(k) }" />
    </n-layout-sider>
</template>
<style lang="scss">
.logo {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: var(--color);
    font-size: 1.5em;
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    transition: padding 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        font-size 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.n-layout-sider--collapsed .logo {
    padding: 8px;
    font-size: 0;
}

.logo svg {
    flex: 0 0 32px;
    height: 32px;
    margin-right: 12px;
    transition: margin 0.3s var(--bezier);
}

.n-layout-sider--collapsed .logo svg {
    margin-right: 0;
}
</style>