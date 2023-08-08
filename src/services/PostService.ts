import RepositoryFactory from "@/repositories/RepositoryFactory";
import PostType from "@/types/PostType";
import PostOnListType from "@/types/PostOnListType";
import OffsetPaginationType from "@/types/OffsetPaginationType";
import PostConst from "@/constants/PostConst";

class PostService {
	// 記事一覧取得
	static async getList({ page, categoryId }: {
		page: number,
		categoryId?: number
	}): Promise<[PostOnListType[], number]>{
		try {
			const offsetPagination = this._makeOffsetPaginationFromPage(page)
			const res = await RepositoryFactory.post.getList({ offsetPagination, categoryId })
			// console.log(res)
			const postList = res.data.data.posts.edges.map((data: any) => {
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

			return [postList, res.data.data.posts.pageInfo.offsetPagination.total]
		} catch {
			return[[], 0]
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


	static async getAllPageAndCategoryList() {
		const total = await this.getTotal()
		const pageList = this._makePageList(total)
		const allPageAndCategoryList = pageList.map((page: number) => { //ページナンバーが必要だからpageList.map
			return {
				params: { param: ['page', page.toString()] }
			}
			// こういう配列を返す
			// [
			// 	{ params: { param: ['page', '1'] } },
			// 	{ params: { param: ['page', '2'] } },
			// ]
		})


		// カテゴリーの種類ごとにそのカテゴリーが何ページになるか計算して、ページパラメーターを返す
		const res = await RepositoryFactory.post.getAllCategorySlugList()
		res.data.data.categories.edges.forEach((data: any) => { //カテゴリーの種類ごとにループ
			const categorySulg = data.node.slug
			const total = data.node.posts.pageInfo.offsetPagination.total
			const pageList = this._makePageList(total)
			pageList.forEach((page: number) => {
				allPageAndCategoryList.push(
					{
						params: { param: ['category', categorySulg, 'page', page.toString()] }
					}
					// カテゴリー用に↓の形をさらにpushしていく
					// { params: { param: ['category', 'test', 'page', '1'] } },
				)
			})
		})

		return allPageAndCategoryList
	}


	// static async getAllCategorySlugList(): Promise<{
	// 	params: {
	// 		slug: string
	// 	}
	// }[]>{
	// 	try {
	// 		const res = await RepositoryFactory.post.getAllCategorySlugList()
	// 		return res.data.data.categories.edges.map((data: any) => {
	// 			return { params: {slug: data.node.slug}}
	// 		})
	// 	} catch {
	// 		return[]
	// 	}
	// }


	// static async getAllPageList(): Promise<{
	// 	params: {
	// 		page: string
	// 	}
	// }[]>{
	// 	const total = await this.getTotal()
	// 	const pageTotal = Math.ceil(total / PostConst.sizePerPage) // 3
	// 	const pageList = [...Array(pageTotal)].map((_, i) => i + 1) // [1,2,3]
	// 	return pageList.map((page: number) => {
	// 		return {
	// 			params: { page: page.toString() }
	// 		}
	// 	})
	// }


	static async getCategoryIdBySlug({ slug }: {
		slug: string
	}): Promise<number> {
		const res = await RepositoryFactory.post.getCategoryIdBySlug({ slug })
		return res.data.data.category.categoryId
	}

	static async getTotal(): Promise<number>{
		const res = await RepositoryFactory.post.getTotal()
		return res.data.data.posts.pageInfo.offsetPagination.total
	}


	private static _makeOffsetPaginationFromPage(page: number): OffsetPaginationType{
		return {offset: (page - 1) * PostConst.sizePerPage, size: PostConst.sizePerPage}
	}

	private static _makePageList(total: number){
		const pageTotal = Math.ceil(total / PostConst.sizePerPage) // 3
		return [...Array(pageTotal)].map((_, i) => i + 1)
	}
}

export default PostService