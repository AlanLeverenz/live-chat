import { ref } from 'vue'  // to user ref values
import { projectAuth, projectFirestore } from '../firebase/config'

const useCollection = (collection) => {
    // to allow for unique errors for each collection
    const error = ref(null)  

    const addDoc = async (doc) => {
        error.value = null  // resetting the error for each async

        try {
            await projectFirestore.collection(collection).add(doc)

        } catch(err) {
            console.log(err.message)
            error.value = 'could not send the message'
        }
    }

    return { error, addDoc }
}

export default useCollection