import { Note } from '@/components/Note'
import { getArticleById } from '@/lib/articleDataContext'

export default async function Page({ params }: { params: { id: string } }) {
  const noteId = params.id
  const note = await getArticleById(noteId)
  if (note) {
    return (
      <Note noteId={noteId} note={note}></Note>
    )
  }
  return (
    // <div className="note-viewer">
    //   <div className="note-viewer-header">
    //     <div className="note-viewer-header-title">
    //       { note?.title}
    //     </div>
    //   </div>
    //   <div className="note-viewer-content">
    //     <div className="note-viewer-content-text">{content}</div>
    //   </div>
    // </div>
    <div className="note--empty-state">
      <span className="note-text--empty-state">
        Click a note on the left to view something! 🥺
      </span>
    </div>
  )
}
