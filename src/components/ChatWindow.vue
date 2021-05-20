<template>
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="messages">
        <div v-for="doc in documents" :key="doc.id" class="single">
            <span class="created-at">{{ doc.createdAt }}</span>
            <span class="name">{{ doc.name }}</span>
            <span class="message">{{ doc.message }}</span>
        </div>
    </div>
</template>

<script>
    import getCollection from '../composables/getCollection'

export default {
    setup() { // invoke getCollection to display on screen
    const { error, documents } =  getCollection('messages')

    return { error, documents }
    }
}
</script>

<style>

</style>