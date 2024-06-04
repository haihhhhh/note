import dayjs from 'dayjs'

import EditButton from '@/components/EditButton'
import { NotePreview } from '@/components/NotePreview'
import { Article } from '@/lib/articleDataContext'

export function Note({ noteId, note }: { noteId: string, note: Article }) {
  const { title, updateTime, content } = note

  return (
    <>
      <div className="note">
        <div className="note-heaer">
          <h1>
            {title}
          </h1>
          <div className="note-menu" role="menubar">
            <small className="note-updated-at" role="status">
              Last updated on
              {' '}
              {dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}
            </small>
            <EditButton noteId={noteId}>Edit</EditButton>
          </div>
        </div>
        <NotePreview>{content}</NotePreview>
      </div>

    </>
  )
}
