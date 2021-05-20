<template>
    <div class="container">
        <Navbar />
        <ChatWindow />
        <NewChatForm />
    </div>

</template>

<script>
// get the current user using the getUser composable
// watch the current user for changes
// redirect the user to the Welcome page when they are logged out
import NewChatForm from '../components/NewChatForm.vue'
import ChatWindow from '../components/ChatWindow.vue'
import Navbar from '../components/Navbar'
import getUser from '../composables/getUser'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
    components: { Navbar, NewChatForm, ChatWindow }, // register imported components
    setup() {
        const router = useRouter()
        const { user } = getUser()

        // if the user value is ever null, redirect to welcome screen
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