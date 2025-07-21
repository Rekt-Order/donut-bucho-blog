export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  mainImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  publishedAt: string
  body: any[]
  categories?: Category[]
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}