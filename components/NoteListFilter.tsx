'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'

export function NoteListFilter({
  notes,
}: {
  notes: React.ReactElement<{ title: string }>[]
}) {
  const searchParams = useSearchParams()
  const searchText = searchParams.get('keyword')

  return (
    <ul className="notes-list">
      {notes.map((child, index) => {
        const title = child.props.title
        if (
          !searchText
          || (searchText && title.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return <li key={index}>{child}</li>
        }
        return null
      })}
    </ul>
  )
}
