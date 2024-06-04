import { useState } from 'react'
import { useFormState } from 'react-dom'

import { deleteNote, saveNote } from '@/app/action'
import DeleteButton from '@/components/DeleteButton'
import { NotePreview } from '@/components/NotePreview'
import SaveButton from '@/components/SaveButton'
import { EditorFormState, initialState } from '@/lib/articleSlice'

export enum EditorFormStateCode {
  Success = 'success',
  Error = 'error',
}
export default function Editor({
  noteId,
  initialTitle,
  initialBody,
}: {
  noteId: string | null
  initialTitle: string
  initialBody: string
}) {
  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState(initialBody)

  const [saveState, saveFormAction] = useFormState<EditorFormState, FormData>(
    saveNote,
    initialState,
  )

  const [deleteState, deleteFormAction] = useFormState<EditorFormState, FormData>(
    deleteNote,
    initialState,
  )
  // useEffect(() => {
  //   if (saveState?.code === EditorFormStateCode.Success) {
  //     // 派发表单提交事件
  //     store.dispatch(articleSliceActions.formSubmit(saveState))
  //   }
  //   if (deleteState?.code === EditorFormStateCode.Success) {
  //     // 派发表单提交事件
  //     store.dispatch(articleSliceActions.formSubmit(deleteState))
  //   }
  // }, [saveState, deleteState])

  return (
    <>
      <div className="note-editor">
        <form className="note-editor-form" autoComplete="off">
          <div className="note-editor-menu" role="menubar">
            <input type="hidden" name="noteId" value={noteId || ''} />
            <SaveButton formAction={saveFormAction}></SaveButton>
            <DeleteButton formAction={deleteFormAction} noteId={noteId}></DeleteButton>
          </div>
          <div className="note-editor-menu">{saveState?.message}</div>
          <div style={{ textAlign: 'right' }}>
            {saveState?.errors
            && saveState.errors.map(item => (
              <p key={item.path.toString()}>
                {item.path}
                {' '}
                {item.message}
              </p>
            ))}
          </div>
          <label className="offscreen" htmlFor="note-title-input">
            Enter a title for your note
          </label>
          <input
            id="note-title-input"
            name="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          <label className="offscreen" htmlFor="note-body-input">
            Enter a body for your note
          </label>
          <textarea
            id="note-body-input"
            name="body"
            value={body}
            onChange={(e) => {
              setBody(e.target.value)
            }}
          />
        </form>
        <div className="note-editor-preview">
          <div className="note-editor-preview-title">
            <h1>{title}</h1>
            <hr className="note-editor-preview-title-hr" />
          </div>
          <NotePreview children={
          body
        }
          >
          </NotePreview>
        </div>
      </div>
    </>
  )
}
