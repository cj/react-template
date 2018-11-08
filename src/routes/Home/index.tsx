import React, { useCallback, useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import firestore from '~/lib/firebase/firestore'
import Layout from '~/layouts/Default'
import { QuerySnapshot, DocumentChange } from '@firebase/firestore-types'
import { useInput, useFirestore } from '~/hooks'

const HomeRoute: React.SFC<RouteComponentProps> = () => {
  const [todoInput, setTodoInput] = useInput('')
  const [todos, todosMutation] = useFirestore(firestore.collection('todos'), {
    limit: 5,
  })

  const addTodo = useCallback(
    () => {
      todos.ref.add({
        content: todoInput.value,
      })

      setTodoInput('')
    },
    [todoInput],
  )

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
        {!todos.fetching
          && todos.data.map((todo: any) => (
            <li key={todo.id}>
              {todo.content} : {todo.id}
            </li>
          ))}
      </ul>
    </Layout>
  )
}

export default HomeRoute
