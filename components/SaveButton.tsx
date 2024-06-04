import { useFormStatus } from 'react-dom'

export default function SaveButton({ formAction }: any) {
  const { pending } = useFormStatus()
  return (
    <button
      className="note-editor-done"
      type="submit"
      role="menuitem"
      disabled={pending}
      formAction={formAction as any}
    >
      {pending ? 'saving' : 'done'}
    </button>
  )
}
