'use client'

import Link from 'next/link'

export default function EditButton({ noteId, children }:
{ noteId: string, children: React.ReactNode }) {
  const isEdit = noteId == null
  return (
    <>
      <Link href={`/note/edit/${noteId || ''}`} className="link-unstyled">
        <button
          className={[
            'edit-button',
            isEdit ? 'edit-button--solid' : 'edit-button--outline',
          ].join(' ')}
          role="menuitem"
        >
          {children}
        </button>
      </Link>
    </>
  )
}
