import RepositoryFactory from "@/repositories/RepositoryFactory";
import PostType from "@/types/PostType";
import PostOnListType from "@/types/PostOnListType";
import OffsetPaginationType from "@/types/OffsetPaginationType";

class PostService {
	// 記事一覧取得
	static async getList({ page, categoryId }: {
		page: number,
		categoryId?: number
	}): Promise<PostOnListType[]>{
		try {
			const offsetPagination = this._makeOffsetPaginationFromPage(page)
			const res = await RepositoryFactory.post.getList({ offsetPagination, categoryId })
			// console.log(res)
			return res.data.data.posts.edges.map((data: any) => {
				const post: PostOnListType = {
					id: data.node.id,
					title: data.node.title,
					slug: data.node.slug,
					date: data.node.date,
					excerpt: data.node.excerpt,
					featuredImage: {
						url: data.node.featuredImage.node.sourceUrl
					},
					category: {
						slug: data.node.categories.edges[0].node.slug,
						name: data.node.categories.edges[0].node.name,
					}
				}
				return post
				// return data.node
			})
		} catch {
			return[]
		}
	}


	static async getOne({ id }: {
		id: string
	}): Promise<PostType | null> { // エラーがあればnullを返す
		try {
			const res = await RepositoryFactory.post.getOne({ id }) // idを引数に取る
			const data = res.data.data.post
			const post: PostType = {
				id: data.id,
				title: data.title,
				slug: data.slug,
				date: data.date,
				content: data.content,
				featuredImage: {
					url: data.featuredImage.node.sourceUrl
				},
				category: {
					slug: data.categories.edges[0].node.slug,
					name: data.categories.edges[0].node.name
				}
			}
			console.log('ok')
			return post // 配列ではなくPostTypeを返す
		} catch {
			console.log('エラー')
			return null // エラーがあればnullを返す
			// throw Error()
		}
	}



	static async getAllSlugList(): Promise<{
		params: {
			slug: string
		}
	}[]>{
		try {
			const res = await RepositoryFactory.post.getAllSlugList()
			return res.data.data.posts.edges.map((data: any) => {
				return { params: {slug: data.node.slug}}
			})
		} catch {
			return[]
		}
	}


	static async getAllCategorySlugList(): Promise<{
		params: {
			slug: string
		}
	}[]>{
		try {
			const res = await RepositoryFactory.post.getAllCategorySlugList()
			return res.data.data.categories.edges.map((data: any) => {
				return { params: {slug: data.node.slug}}
			})
		} catch {
			return[]
		}
	}

	static async getCategoryIdBySlug({ slug }: {
		slug: string
	}): Promise<number> {
		const res = await RepositoryFactory.post.getCategoryIdBySlug({ slug })
		return res.data.data.category.categoryId
	}


	private static _makeOffsetPaginationFromPage(page: number): OffsetPaginationType{
		return {offset: (page - 1) * 9, size: 9}
	}
}

export default PostService