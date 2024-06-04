import { useFormStatus } from 'react-dom'

export default function DeleteButton({ noteId, formAction }: { noteId: string | null, formAction: any }) {
  const { pending } = useFormStatus()
  return (
    noteId && (
      <button
        className="note-editor-delete"
        disabled={pending}
        formAction={formAction}
        role="menuitem"
      >
        Delete
      </button>
    )
  )
}
