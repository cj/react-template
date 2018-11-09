import React, { useCallback, useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import firestore from '~/lib/firebase/firestore'
import Layout from '~/layouts/Default'
import { QuerySnapshot, DocumentChange } from '@firebase/firestore-types'
import { useInput, useFirestore } from '~/hooks'
import { signIn } from '~/lib/firebase/auth'

const HomeRoute: React.SFC<RouteComponentProps> = () => {
  const [todoInput, setTodoInput] = useInput('')

  const [todos, todosMutation] = useFirestore('todos', {
    orderBy: ['createdAt', 'desc'],
  })

  const addTodo = useCallback(
    () => {
      todosMutation.add({
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
        onClick={() => signIn('google')}
      >
        Sign-In
      </button>

      <button
        type="submit"
        className="p-1 border border-grey bg-grey"
        onClick={addTodo}
      >
        Add Todo
      </button>

      <input className="p-1 border border-grey" type="text" {...todoInput} />

      <h1 className="mt-2 mb-2">Todos</h1>

      {todos.empty && <div>Empty!</div>}

      <ul>
        {!todos.fetching
          && todos.data.map((todo: any) => (
            <li
              className="flex flex-row content-center items-center mt-2"
              key={todo.id}
            >
              <div>
                {todo.content} : {todo.id}
              </div>
              <button
                onClick={() => todosMutation.remove(todo)}
                type="submit"
                className="p-1 ml-2 bg-err text-white"
              >
                x
              </button>
            </li>
          ))}
      </ul>
    </Layout>
  )
}

export default HomeRoute
