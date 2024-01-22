import { State } from '../../store'
import { useDispatch, useSelector } from '../../store/adapter'
import TodoCard from './TodoCard'
import styles from './main.module.css'

// bad - rerenders all components
const todosSelector = (state: State) => {
  return state.todos
}

// good
const todosIdSelector = (state: State) => {
  return Array.from(state.todos.keys())
}

// good
export const todoIdSelector = (state: State, id: number) => {
  return state.todos.get(id)
}

const compareArrays = (a: number[], b: number[]) => {
  return JSON.stringify(a) === JSON.stringify(b)
}

const MainPage = () => {
  const todos = useSelector(todosIdSelector, compareArrays)

  const dispatch = useDispatch()

  return (
    <div className={styles['todo_container']}>
      <div className={styles['action_buttons']}>
        <button
          className={styles['create_todo_btn']}
          onClick={() => {
            dispatch({
              type: 'ActionAddTodo',
              title: 'Lorem ipsum dolor sit amet',
              desc: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
              isDone: false,
            })
          }}
        >
          Создать следующую
        </button>
        <button
          className={styles['create_todo_btn']}
          onClick={() => {
            dispatch({
              type: 'ActionDeleteTodo',
              id: todos[0]!,
            })
          }}
        >
          Удалить первую
        </button>
      </div>

      {Array.from(todos.values()).map((todoId) => {
        return <TodoCard key={todoId} todoId={todoId} />
      })}
    </div>
  )
}

export default MainPage
