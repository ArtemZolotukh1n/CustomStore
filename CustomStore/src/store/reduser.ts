import { State } from '.'
import exhaustivenessCheck from '../utils/exhaustivenessCheck'
import { createDraft, finishDraft } from 'immer'
export type Action =
  | ActionAddTodo
  | ActionDeleteTodo
  | ActionCompleteTodo
  | ActionEditTodo

type ActionAddTodo = {
  type: 'ActionAddTodo'
  title: string
  desc: string
  isDone: boolean
}

type ActionEditTodo = {
  type: 'ActionEditTodo'
  id: number
  title: string
  desc: string
}

type ActionDeleteTodo = {
  type: 'ActionDeleteTodo'
  id: number
}

type ActionCompleteTodo = {
  type: 'ActionCompleteTodo'
  id: number
}

export const reducer = (state: State, action: Action): State => {
  const draft = createDraft(state)

  switch (action.type) {
    case 'ActionAddTodo': {
      draft.todos.set(state.nextId, {
        id: state.nextId,
        title: action.title + ` ${state.nextId}`,
        desc: action.desc,
        isDone: action.isDone,
      })
      draft.nextId++
      break
    }

    case 'ActionDeleteTodo': {
      console.log(action.id)
      draft.todos.delete(action.id)
      break
    }

    case 'ActionCompleteTodo': {
      const todo = draft.todos.get(action.id)
      if (!todo) {
        break
      }
      todo.isDone = !todo.isDone
      break
    }

    case 'ActionEditTodo': {
      const todo = draft.todos.get(action.id)
      if (!todo) {
        break
      }

      todo.title = action.title
      todo.desc = action.desc
      break
    }

    default:
      exhaustivenessCheck(action)
  }

  return finishDraft(draft)
}
