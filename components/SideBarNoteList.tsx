/**
 * @description 侧边栏笔记列表
 */
'use client'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { EditorFormStateCode } from '@/components/Editor'
import { NoteItem } from '@/components/NoteItem'
import { Article, listAllArticles } from '@/lib/articleDataContext'
import { formCode } from '@/lib/articleSlice'

export default function SideBarNoteList() {
  const getFormCode = useSelector(formCode)
  const [articleData, setArticleData] = useState<Article[]>(listAllArticles())

  if (articleData.length === 0)
    return <div className="notes-empty">No notes created yet!</div>
  useEffect(() => {
    // 监听表单状态变化
    if (getFormCode === EditorFormStateCode.Success) {
      // 表单提交成功后，重新获取数据
      console.log('表单提交成功后，重新获取数据')
      setArticleData(listAllArticles())
    }
  }, [getFormCode])
  return (
    <>
      <ul className="notes-list">
        {articleData.map((article) => { 
          const { id, title, content, updateTime } = article // 解构Article对象
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
