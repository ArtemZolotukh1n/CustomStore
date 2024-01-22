import { Action, reducer } from './reduser'

export type Todo = {
  id: number
  title: string
  desc: string
  isDone: boolean
}

export type State = {
  todos: Map<number, Todo>
  nextId: number
}

export type Dispatch = (action: Action) => void

export type Store = {
  getState: () => State
  dispatch: (action: Action) => void
  subscribe: (listener: Listener) => () => void
}

export const createInitialState = (): State => {
  return {
    todos: new Map([
      [
        0,
        {
          id: 0,
          title: 'Проснуться',
          desc: 'Проснуться рано утром',
          isDone: false,
        },
      ],
      [
        1,
        {
          id: 1,
          title: 'Сделать зарядку',
          desc: 'Отжимания 3 подхода, приседания с гирей 3 подхода, растяжка',
          isDone: false,
        },
      ],
      [
        2,
        {
          id: 2,
          title: 'Зубы',
          desc: 'Почистить зубы',
          isDone: false,
        },
      ],
      [
        3,
        {
          id: 3,
          title: 'Защитить лабу',
          desc: '14:00',
          isDone: false,
        },
      ],
    ]),

    nextId: 4,
  }
}

type Listener = (state: State) => void

export const createStore = (
  getInitialState: () => State = createInitialState
): Store => {
  let state = getInitialState()
  const listeners = new Set<Listener>()

  const getState = () => state

  const dispatch = (action: Action) => {
    const newState = reducer(state, action)

    const isNewState = newState !== state

    if (isNewState) {
      state = newState

      listeners.forEach((listener) => {
        listener(newState)
      })
    }
  }

  // add browser listners
  const subscribe = (listener: Listener) => {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}
