import { Suspense } from 'react'

import EditButton from '@/components/EditButton'
import { NoteListSkeleton } from '@/components/NoteListSkeleton'
import SideBarNoteList from '@/components/SideBarNoteList'
import { SideBarSearch } from '@/components/SideBarSearch'

export default function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <section className="sidebar-header">
          <img
            className="logo"
            src="/next.svg"
            width="100px"
            height="100px"
            alt=""
            role="presentation"
          />
          <div className="text-1xl text-purple-400 text-center">
            <strong>React Notes</strong>
          </div>
        </section>
        <section className="sidebar-menu">
          <SideBarSearch></SideBarSearch>
          <EditButton noteId="">New</EditButton>
        </section>

        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SideBarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
}
