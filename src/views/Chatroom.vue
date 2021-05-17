<template>
    <div class="container">
        <Navbar />
    </div>

</template>

<script>
// get the current user using the getUser composable
// watch the current user for changes
// redirect the user to the Welcome page when they are logged out

import Navbar from '../components/Navbar'
import getUser from '../composables/getUser'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
    components: { Navbar },
    setup() {
        const { user } = getUser()
        const router = useRouter()

        watch(user, () => {
            if (!user.value) {
                router.push({ name: 'Welcome' })
            }
        })
    }
}
</script>

<style>

</style>