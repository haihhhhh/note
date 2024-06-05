/**
 * @description 侧边栏笔记列表
 */
import { NoteItem } from '@/components/NoteItem'
import { Article, listAllArticles } from '@/lib/articleDataContext'

export default async function SideBarNoteList() {
  const articleData1 = await listAllArticles()
  // console.log(Object.values(articleData1))
  if (articleData1.length === 0) {
    return <div className="notes-empty">No notes created yet!</div>
  }
  return (
    <>
      <ul className="notes-list">
        {Object.values(articleData1).map((article: Article) => {
          const { id, title, content, updateTime } = article
          return (
            <li key={id}>
              <NoteItem
                noteId={id}
                note={{
                  id,
                  title,
                  content,
                  updateTime,
                }}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}
