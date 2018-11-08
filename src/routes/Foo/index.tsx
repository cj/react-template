/// <reference types="@firebase/firestore-types" />
import React, { useCallback, useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import firestore from '~/lib/firebase/firestore'
import Layout from '~/layouts/Default'
import { QuerySnapshot } from '@firebase/firestore-types'

const todosRef = firestore.collection('todos')

const HomeRoute: React.SFC<RouteComponentProps> = () => {
  const addTodo = useCallback(() => todosRef.add({
    content: 'test',
  }))

  const [todos, setTodos] = useState([])

  useEffect(() => {
    const unsubscribe = todosRef.onSnapshot((doc: QuerySnapshot) => {
      if (doc.empty) return

      console.log(doc)

      // setTodos(
      //   docs.map((doc: any) => {
      //     return Object.assign(doc, doc.data())
      //   }),
      // )
    })

    return () => unsubscribe
  }, [])

  return (
    <Layout>
      <button type="submit" className="p-1 bg-grey" onClick={addTodo}>
        Add Todo
      </button>

      <h1>Todos</h1>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </Layout>
  )
}

export default HomeRoute
