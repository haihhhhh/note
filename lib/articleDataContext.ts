import { readFile, writeFile } from 'node:fs/promises'

import { ZodIssue } from 'zod'

export interface EditorFormState {
  message: string
  code: string
  errors?: ZodIssue[]
}
export enum EditorFormStateCode {
  Success = 'success',
  Error = 'error',
}

export const initialState: EditorFormState = {
  message: '',
  code: EditorFormStateCode.Error,
  errors: [],
}
// export const articleData: Record<string, string> = {
//   1702459181837: '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
//   1702459182837: '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
//   1702459188837: '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
// }

// // 将文章数据转换为Article对象
// export const parsedArticleData = Object.fromEntries(
//   Object.entries(articleData).map(([id, jsonString]) => {
//     const article = JSON.parse(jsonString)
//     return [id, { ...article, id }] // 确保每个对象中都有id字段
//   }),
// )
// 列出所有文章
export async function listAllArticles(): Promise<Article[]> {
  try {
    const data = await readFile('lib/data.json')
    const parsedArticleData = JSON.parse(data.toString()) as Record<string, string> // 确保解析后的数据被正确断言

    // 遍历解析后的对象，将每个文章字符串再次解析为对象
    const articles = Object.entries(parsedArticleData).map(([id, articleStr]) => {
      const articleObj = JSON.parse(articleStr as string) // 在这里使用类型断言
      return { id: Number.parseInt(id), ...articleObj }
    })

    return articles
  }
  catch (error) {
    throw new Error('Failed to list all articles')
  }
}

// 获取文章方法
export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const data = await readFile('lib/data.json')
    const parsedArticleData = JSON.parse(data.toString()) as Record<string, string>

    const articleStr = parsedArticleData[id]
    if (!articleStr) {
      // throw new Error(`Article with ID ${id} not found`)
      return null
    }

    const articleObj = JSON.parse(articleStr)
    return { id: Number.parseInt(id), ...articleObj }
  }
  catch (error) {
    // throw new Error(`Failed to get article with ID`)
    return null
  }
}

// 更新文章方法
export async function updateArticle(id: string, newFields: Partial<Article>): Promise<boolean> {
  try {
    const data = await readFile('lib/data.json')
    const parsedArticleData = JSON.parse(data.toString()) as Record<string, string> // 确保正确解析为对象

    if (parsedArticleData[id]) {
      // 更新指定ID的文章内容
      parsedArticleData[id] = JSON.stringify({ ...(JSON.parse(parsedArticleData[id]) as Article), ...newFields })

      // 将更新后的数据写回文件
      await writeFile('lib/data.json', JSON.stringify(parsedArticleData))

      return true // 更新成功
    }

    return false // 文章ID不存在
  }
  catch (error) {
    throw new Error(`Failed to update article with ID ${id}: `)
  }
}

// 删除文章方法
export async function deleteArticleById(id: string): Promise<boolean> {
  try {
    const data = await readFile('lib/data.json')
    const parsedArticleData = JSON.parse(data.toString()) as Record<string, string>

    if (parsedArticleData[id]) {
      delete parsedArticleData[id]
      await writeFile('lib/data.json', JSON.stringify(parsedArticleData))
      return true
    }

    return false // 文章ID不存在
  }
  catch (error) {
    throw new Error(`Failed to delete article with ID ${id}`)
  }
}

// 增加文章
export async function createArticle(article: Article): Promise<string> {
  const uniqueId = `${Date.now()}${Math.floor(Math.random() * 10000)}` // 生成一个唯一的ID
  const data = await readFile('lib/data.json')
  const parsedArticleData = JSON.parse(data.toString()) as Record<string, string>

  parsedArticleData[uniqueId] = JSON.stringify(article)

  try {
    await writeFile('lib/data.json', JSON.stringify(parsedArticleData))
    return uniqueId // 返回新文章的ID
  }
  catch (error) {
    throw new Error(`Failed to create article`)
  }
}

// 定义文章数据的接口
export interface Article {
  id: string // 添加id属性
  title: string
  content: string
  updateTime: string
}
