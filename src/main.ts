import { createApp } from 'vue'
import { createPinia } from 'pinia'

import naive from "naive-ui";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive);

app.mount('#app')

Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});
