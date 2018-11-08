import React, { useCallback, useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import firestore from '~/lib/firebase/firestore'
import Layout from '~/layouts/Default'
import { QuerySnapshot, DocumentChange } from '@firebase/firestore-types'
import { useInput } from '~/hooks'

const todosRef = firestore.collection('todos')

const HomeRoute: React.SFC<RouteComponentProps> = () => {
  const [todoInput, setTodoInput] = useInput('')
  const [todos, setTodos] = useState({})
  const [initialized, setInitialized] = useState(false)

  const addTodo = useCallback(
    () => {
      todosRef.add({
        content: todoInput.value,
      })

      setTodoInput('')
    },
    [todoInput],
  )

  useEffect(() => {
    const unsubscribe = todosRef.onSnapshot((doc: QuerySnapshot) => {
      if (doc.empty) return

      doc.docChanges().forEach((snapshot: DocumentChange) => {
        const id = snapshot.doc.id // eslint-disable-line prefer-destructuring
        const data = snapshot.doc.data()

        switch (snapshot.type) {
          case 'added':
          case 'modified':
            setTodos((prevTodos: any) => ({
              ...prevTodos,
              [id]: Object.assign({}, data, snapshot.doc),
            }))
            break
          case 'removed':
            setTodos((prevTodos: any) => {
              const newTodos = { ...prevTodos }
              delete newTodos[id]
              return newTodos
            })
            break
          default:
            break
        }
      })

      setInitialized(true)
    })

    return () => unsubscribe
  }, [])

  return (
    <Layout className="m-5">
      <button
        type="submit"
        className="p-1 border border-grey bg-grey"
        onClick={addTodo}
      >
        Add Todo
      </button>

      <input className="p-1 border border-grey" type="text" {...todoInput} />

      <h1 className="mt-2 mb-2">Todos</h1>
      <ul>
        {initialized
          && Object.entries(todos).map(([id, todo]: any) => (
            <li key={id}>
              {todo.content} : {id}
            </li>
          ))}
      </ul>
    </Layout>
  )
}

export default HomeRoute
