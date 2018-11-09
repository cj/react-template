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
import firebase from '~/lib/firebase'
import firestore from '~/lib/firebase/firestore'

type QueryKey = string | FieldPath
type QueryFilters = WhereFilterOp
type QueryValue = string | number | null

type Query = [QueryKey, QueryFilters, QueryValue]

type OrderByDirection = 'asc' | 'desc' | undefined
type OrderByArray = [string, OrderByDirection]

type OrderBy = string | OrderByArray | Array<any>
type Where = Array<any> | Query

interface Options {
  where?: Where
  limit?: number | undefined
  orderBy?: OrderBy
}

export const useFirestore = (
  collection: CollectionReference | string,
  options: Options = {},
): any => {
  const [data, setData] = useState<any>([])
  const [fetching, setFetching] = useState<boolean>(true)
  const ref = useMemo(
    () => (typeof collection === 'string'
      ? firestore.collection(collection)
      : collection) as CollectionReference,
    [options, collection],
  )

  const empty = useMemo(() => !fetching && data.length === 0, [data, fetching])

  const add = useCallback(
    (newData: object) => {
      ref.add({
        ...newData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    },
    [ref],
  )

  const update = useCallback(
    (doc: any, newData: object) => {
      doc.ref.update({
        ...newData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    },
    [ref],
  )

  const remove = useCallback(
    (doc: any) => {
      if (data.length === 1 && doc.id === data[0].id) {
        setData([])
      }
      doc.ref.delete()
    },
    [ref],
  )

  useEffect(() => {
    let filterRef = ref

    if (options.where) {
      const where: any = Array.isArray(options.where[0])
        ? options.where
        : [options.where]

      where.forEach((query: Query) => {
        filterRef = filterRef.where(...query) as CollectionReference
      })
    }

    if (options.orderBy) {
      const orderBy: any = Array.isArray(options.orderBy[0])
        ? options.orderBy
        : [options.orderBy]

      orderBy.forEach((ob: OrderByArray) => {
        filterRef = filterRef.orderBy(...ob) as CollectionReference
      })
    }

    const unsubscribe = filterRef
      .limit(options.limit || 25)
      .onSnapshot((doc: QuerySnapshot) => {
        if (doc.empty) {
          setFetching(false)
          return
        }

        doc.docChanges().forEach((snapshot: DocumentChange) => {
          const id = snapshot.doc.id // eslint-disable-line prefer-destructuring
          const docData = Object.assign({}, snapshot.doc.data(), {
            id,
            ref: snapshot.doc.ref,
            metadata: snapshot.doc.metadata,
          })

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

  const state = {
    data,
    fetching,
    empty,
    ref,
  }

  const mutation = { add, remove, update }

  return [state, mutation]
}

export default useFirestore
