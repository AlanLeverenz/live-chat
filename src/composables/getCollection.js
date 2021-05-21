import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection) => {

  const documents = ref(null)
  const error = ref(null)

  // register the firestore collection reference
  let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt')

  const unsub = collectionRef.onSnapshot(snap => {

    console.log('snapshot')

    let results = []
        // data() function gets data, spread out to list data objects
        // logical AND: code on right only executes if left data is true
        // must wait for local chat message createdAt reference to create a timeStamp on server, which fires a server snapshot
        snap.docs.forEach(doc => {
            // must wait for the server to create the timestamp & send it back
            // we don't want to edit data until it has done this
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
          });
          
          // update values
          documents.value = results
          error.value = null
        }, err => {
          console.log(err.message)
          documents.value = null
          error.value = 'could not fetch the data'
        })

        // unsubscribes from prev collection when watcher is stopped (component unmounts: stops snapshots)
        watchEffect((onInvalidate) => {
            onInvalidate(() => unsub())
        })

      
        return { error, documents }
      }
      
      export default getCollection