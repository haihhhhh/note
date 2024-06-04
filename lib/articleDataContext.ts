export const articleData: Record<string, string> = {
  1702459181837: '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459182837: '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459188837: '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
}
// 将文章数据转换为Article对象
export const parsedArticleData = Object.fromEntries(
  Object.entries(articleData).map(([id, jsonString]) => [id, JSON.parse(jsonString)]),
)

// 获取文章方法
export function getArticleById(id: string): Article | undefined {
  return parsedArticleData[id]
}

// 更新文章方法
export function updateArticle(id: string, newFields: Partial<Article>): boolean {
  if (parsedArticleData[id]) {
    parsedArticleData[id] = { ...parsedArticleData[id], ...newFields }
    articleData[id] = JSON.stringify(parsedArticleData[id])
    return true
  }
  return false // 文章ID不存在
}

// 删除文章方法
export function deleteArticleById(id: string): boolean {
  if (parsedArticleData[id]) {
    delete parsedArticleData[id]
    delete articleData[id]
    return true
  }
  return false // 文章ID不存在
}

// 列出所有文章
export function listAllArticles(): Article[] {
  return Object.values(parsedArticleData)
}

// 增加文章
export function createArticle(article: Article): boolean {
  const id = Date.now().toString()
  parsedArticleData[id] = article
  // 将新文章的JSON字符串添加到articleData
  articleData[id] = JSON.stringify(article)
  return true
}

// 定义文章数据的接口
export interface Article {
  id: string // 添加id属性
  title: string
  content: string
  updateTime: string
}
