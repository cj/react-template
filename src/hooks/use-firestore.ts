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

interface Options {
  where?: Array<Query>
  limit?: number | null
  orderBy?: string
}

export const useFirestore = (
  collection: CollectionReference,
  options: Options,
): any => {
  const [data, setData] = useState<any>([])
  const [fetching, setFetching] = useState<boolean>(true)
  const ref = useMemo(
    () => {
      let colRef = collection

      if (options.where) {
        options.where.forEach((query: Query) => {
          colRef = colRef.where(...query) as CollectionReference
        })
      }

      if (options.orderBy) {
        colRef = colRef.orderBy(options.orderBy) as CollectionReference
      }

      colRef = colRef.limit(options.limit || 25) as CollectionReference

      return colRef
    },
    [options, collection],
  )

  useEffect(() => {
    const unsubscribe = ref.onSnapshot((doc: QuerySnapshot) => {
      if (doc.empty) return

      doc.docChanges().forEach((snapshot: DocumentChange) => {
        const id = snapshot.doc.id // eslint-disable-line prefer-destructuring
        const docData = Object.assign({ id }, snapshot.doc.data(), snapshot.doc)

        switch (snapshot.type) {
          case 'added':
            setData((prevData: ReadonlyArray<any>) => {
              const newData = [...prevData]

              newData.splice(
                snapshot.newIndex,
                0,
                Object.assign({}, docData, snapshot.doc),
              )

              return newData
            })
            break
          case 'modified':
            setData((prevData: ReadonlyArray<any>) => {
              const newData = [...prevData]

              if (snapshot.oldIndex !== snapshot.newIndex) {
                newData.splice(snapshot.oldIndex, 1)
                newData.splice(snapshot.newIndex, 0, docData)
              } else {
                newData.splice(snapshot.newIndex, 1, docData)
              }

              return newData
            })
            break
          case 'removed':
            setData((prevData: ReadonlyArray<any>) => {
              const newData = [...prevData]

              newData.splice(snapshot.oldIndex, 1)

              return newData
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
