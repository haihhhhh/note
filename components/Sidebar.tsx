import SideBarNoteList from '@/components/SideBarNoteList'

export default function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <section className="sidebar-header">
          <img
            className="logo"
            src="/next.svg"
            width="220px"
            height="200px"
            alt=""
            role="presentation"
          />
          <div className="text-3xl text-purple-400 mt-7">
            <strong>React Notes</strong>
          </div>
        </section>
        <nav>
          {/* <Suspense fallback={<NoteListSkeleton />}> */}
          <SideBarNoteList />
          {/* </Suspense> */}
        </nav>
      </section>
    </>
  )
}
