import { ref } from 'vue'  // to store values
import { projectFirestore } from '../firebase/config'

const getCollection = (collection) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt')
    
    // onSnapshot sets up listener to firestore db
    // sends back a snap we use in a callback function
    collectionRef.onSnapshot((snap) => {
        let results = []
        // data() function gets data, spread out to list data objects
        // logical AND: code on right only executes if left data is true
        // must wait for local chat message createdAt reference to create a timeStamp on server, which fires a server snapshot
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id }) 
        })
        documents.value = results
        error.value = null
    }, () => {
        console.log(err.message)
        documents.value = null
        error.value = 'could not fetch data'
    })  

    return { documents, error }

}

export default getCollection