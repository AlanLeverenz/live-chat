<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <!-- ref="messages" has values for scrollTop and scrollHeight -->
    <div v-if="documents" class="messages" ref="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createdAt }}</span>
        <span class="name">{{ doc.name }}</span>
        <span class="message">{{ doc.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import { formatDistanceToNow } from 'date-fns'
import { computed, onUpdated, ref } from '@vue/runtime-core'

export default {
  setup() {
    const { error, documents } = getCollection('messages')

    // use computed because calculating from imported data
    const formattedDocuments = computed(() => {
        if (documents.value) {
            return documents.value.map(doc => {
                // creates new array with spread doc objects
                let time = formatDistanceToNow(doc.createdAt.toDate())
                return { ...doc, createdAt: time }
            })
        }
    })

    // messages stores ref values applied in the template
    const messages = ref(null)
    // auto-scroll sets top of scroll to the height.
    onUpdated(() => {
        messages.value.scrollTop = messages.value.scrollHeight
    })

    return { error, documents, formattedDocuments, messages }
  }
}
</script>

<style scoped>
  .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .single {
    margin: 18px 0;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }
</style>