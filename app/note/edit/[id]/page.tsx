import Editor from '@/components/Editor'
import { getArticleById } from '@/lib/articleDataContext'

export default function Page({ params }: { params: { id: string } }) {
  const noteId = params.id
  const note = getArticleById(noteId)
  if (!note) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }
  return (
    <Editor
      noteId={noteId}
      initialTitle={note.title}
      initialBody={note.content}
    />
  )
}
