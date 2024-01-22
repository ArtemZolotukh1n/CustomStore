import { FC, memo, useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from '../../store/adapter'
import { todoIdSelector } from './Main'
import { State } from '../../store'
import styles from './main.module.css'
import { Edit, Check } from 'react-feather'

type TodoProps = {
  todoId: number
}

const TodoCard: FC<TodoProps> = memo(({ todoId }) => {
  const dispatch = useDispatch()
  const selectorWithId = useCallback(
    (state: State) => todoIdSelector(state, todoId),
    [todoId]
  )
  const todo = useSelector(selectorWithId)
  const [isEditing, setIsEditing] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)

  const toggleEditing = () => {
    setIsEditing(!isEditing)
  }

  if (!todo) {
    return 'empty'
  }

  const saveChanges = () => {
    if (titleRef.current && descRef.current) {
      dispatch({
        type: 'ActionEditTodo',
        id: todo.id,
        title: titleRef.current.innerText,
        desc: descRef.current.innerText,
      })
      toggleEditing()
    }
  }

  return (
    <div className={styles['todo_card']}>
      {!isEditing ? (
        <>
          <div>{todo.title}</div>
          <div>{todo.desc}</div>
        </>
      ) : (
        <>
          <div
            className={styles['card_input']}
            ref={titleRef}
            contentEditable
            dangerouslySetInnerHTML={{ __html: todo.title }}
          />
          <div
            className={styles['card_input']}
            ref={descRef}
            contentEditable
            dangerouslySetInnerHTML={{ __html: todo.desc }}
          />
        </>
      )}
      <button
        className={styles['complete_button']}
        onClick={() => {
          dispatch({
            type: 'ActionCompleteTodo',
            id: todo.id,
          })
        }}
      >
        {todo.isDone ? 'Выполнено' : 'Невыполнено'}
      </button>
      {isEditing ? (
        <Check className={styles['edit_btns']} onClick={saveChanges}>
          Готово
        </Check>
      ) : (
        <Edit className={styles['edit_btns']} onClick={toggleEditing}>
          Отредактировать
        </Edit>
      )}
    </div>
  )
})

export default TodoCard
