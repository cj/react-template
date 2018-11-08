import {
  QuerySnapshot,
  DocumentChange,
  FieldPath,
  WhereFilterOp,
  CollectionReference,
} from '@firebase/firestore-types'
import React, {
  useCallback, useState, useEffect, useMemo,
} from 'react'

type QueryKey = string | FieldPath
type QueryFilters = WhereFilterOp
type QueryValue = string | number

type Query = [QueryKey, QueryFilters, QueryValue]

const useFirestore = (
  collection: CollectionReference,
  queries: Array<Query>,
) => {
  const [data, setData] = useState({})
  const [fetching, setFetching] = useState(true)
  const ref = useMemo(
    () => {
      if (queries) {
        queries.forEach((query: Query) => collection.where(...query))
      }

      return collection
    },
    [queries, collection],
  )

  useEffect(() => {
    const unsubscribe = ref.onSnapshot((doc: QuerySnapshot) => {
      if (doc.empty) return

      doc.docChanges().forEach((snapshot: DocumentChange) => {
        const docId = snapshot.doc.id // eslint-disable-line prefer-destructuring
        const docData = snapshot.doc.data()

        switch (snapshot.type) {
          case 'added':
          case 'modified':
            setData((prevTodos: any) => ({
              ...prevTodos,
              [docId]: Object.assign({}, docData, snapshot.doc),
            }))
            break
          case 'removed':
            setData((prevTodos: any) => {
              const newTodos = { ...prevTodos }
              delete newTodos[docId]
              return newTodos
            })
            break
          default:
            break
        }
      })

      setFetching(false)
    })

    return () => unsubscribe
  }, [])

  const state = { data, fetching, ref }
  const mutations = {}

  return [state, mutations]
}

export default useFirestore
