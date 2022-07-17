import { createFetch } from "@vueuse/core";

const useApi = createFetch({
    baseUrl: 'http://mortezaom.me:5000',
    options: {
        async beforeFetch({ options, cancel }) {
            const token = JSON.parse(localStorage.getItem('user') ?? '')['token']
            if (!token) cancel()
            options.headers = {
                ...options.headers,
                Authorization: `${token}`,
            }
            return { options }
        },
    },
    fetchOptions: {
        mode: 'cors',
    },
})

export default useApi