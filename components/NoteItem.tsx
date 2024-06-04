import dayjs from 'dayjs'

import { NoteItemContent } from '@/components/NoteItemContent'
import { Article } from '@/lib/articleDataContext'

interface NoteItemProps {
  noteId: string
  note: Article
}

export function NoteItem(noteItemProps: NoteItemProps) {
  const { noteId, note } = noteItemProps
  const { title, content, updateTime } = note

  return (
    <NoteItemContent
      id={noteId}
      title={title}
      expandedChildren={(
        <p className="sidebar-note-excerpt">
          {content?.substring(0, 20) || <i>(No content)</i>}
        </p>
      )}
    >
      <header className="sidebar-note-header">
        <strong>{title}</strong>
        <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm')}</small>
      </header>
    </NoteItemContent>
  )
}
