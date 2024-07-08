import Cookies from 'js-cookie';
export default defineNuxtPlugin(async (nuxtApp) => {
    let userToken = Cookies.get('authToken') || localStorage.getItem('token');
    if (userToken) {
        await $fetch("/api/v1/evolve/me" , {
            method: "GET",
            baseURL: nuxtApp.$config.public.baseURL,
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        }).then((res) => {
             useStore().setUserData(res.data);
        }).catch((err) => {
            useStore().setUserData(null);
        })

    }
})