<template>
    <form @submit.prevent="handleSubmit">
        <input type="email" required placeholder="email" v-model="email">
        <input type="password" required placeholder="password" v-model="password">
        <div class="error">{{ error }}</div>
        <button>Login</button>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '../composables/useLogin'

export default {
    setup(props, context) {
        // refs
        const email = ref('')
        const password = ref('')

        const { error, login } = useLogin()

        const handleSubmit = async () => {
            await login(email.value, password.value)
            if (!error.value) {
                // cannot use 'this' in setup.
                context.emit('login') // context object contains methods and properties
            }
        }

        return { email, password, handleSubmit, error }
    }
}
</script>