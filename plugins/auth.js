export default defineNuxtPlugin((nuxtApp) => {

    const axios = $fetch.create({
        baseURL: nuxtApp.$config.public.baseURL,
        onRequest({ request, options, error }) {
      
            if (useStore().user?.EvolveToken) {
                
                const headers = options.headers ||= {}
                if (Array.isArray(headers)) {
                    headers.push(['Authorization', `Bearer ${useStore().user?.EvolveToken}`])
                } else if (headers instanceof Headers) {
                    headers.set('Authorization', `Bearer ${useStore().user?.EvolveToken}`)
                } else {
                    headers.Authorization = `Bearer ${useStore().user?.EvolveToken}`
                }
            }
        },
    });

    // Define custom fetch methods
    const customFetch = {
        async $post(url, body, options = {}) {
            return axios(url, {
                method: 'POST',
                body,
                ...options
            })
        },
        async $get(url, options = {}) {

            return axios(url, {
                method: 'GET',
                ...options
            })
        },
        async $put(url, body, options = {}) {
            return axios(url, {
                method: 'PUT',
                body,
                ...options
            })
        },
        async $delete(url, options = {}) {
            return axios(url, {
                method: 'DELETE',
                ...options
            })
        }
    }

    return {
        provide: {
            axios: customFetch
        }
    }
})
