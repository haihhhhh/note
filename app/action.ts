'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { Article, EditorFormState, EditorFormStateCode, createArticle, deleteArticleById, updateArticle } from '@/lib/articleDataContext'

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(100, '字数最多 100'),
})

export async function saveNote(state: EditorFormState, formData: FormData) {
  const noteId = formData.get('noteId')
  // console.log(`saveNote noteid=${noteId}`)
  const data = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date(),
  } as unknown as Article
  // 校验数据
  const validated = schema.safeParse(data)
  if (!validated) {
    return {
      message: `validated failed!`,
      code: EditorFormStateCode.Error,
      errors: validated.error?.issues,
    }
  }
  if (noteId) {
    updateArticle(noteId.toString(), data)
  }
  else {
    createArticle(data)
  }
  revalidatePath('/')
  return { message: !noteId ? `Add Success!` : 'update Success!', code: EditorFormStateCode.Success }
}

// 删除note
export async function deleteNote(prestate: EditorFormState, formData: FormData) {
  const noteId = formData.get('noteId')
  // 校验数据
  if (noteId) {
    deleteArticleById(noteId.toString())
    revalidatePath('/')
    return { message: `delete Success!`, code: EditorFormStateCode.Success }
  }
  return { message: `delete failed!`, code: EditorFormStateCode.Error }
}
