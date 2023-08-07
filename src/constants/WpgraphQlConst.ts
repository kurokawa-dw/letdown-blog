export class WpGraphQlPostConst {

	private static _itemsOnList = `
		title
		id
		date
		slug
		excerpt
		categories {
			edges {
				node {
					slug
					name
				}
			}
		}
		featuredImage {
			node {
				sourceUrl
			}
		}
	`

	private static _itemsOnOne = `
		title
		id
		date
		slug
		content
		categories {
			edges {
				node {
					slug
					name
				}
			}
		}
		featuredImage {
			node {
				sourceUrl
			}
		}
	`

	// 全一覧
	static list = `query PostListQuery($offsetPagination: OffsetPagination) {
		posts(where: {offsetPagination: $offsetPagination}) {
			edges {
				node {
					${this._itemsOnList}
				}
			}
		}
	}`

	// カテゴリー一覧
	static listByCategory = `query PostListByCategoryQuery($offsetPagination: OffsetPagination, $categoryId: Int) {
		posts(where: {offsetPagination: $offsetPagination, categoryId: $categoryId}) {
			edges {
				node {
					${this._itemsOnList}
				}
			}
		}
	}`

	// 記事詳細
	static one = `query PostQuery($id: ID!) {
		post(id: $id, idType: SLUG) {
			${this._itemsOnOne}
		}
	}`

	// slugの一覧
	static allSlugList = `query PostAllSugListQuery {
		posts(first: 10000) {
			edges {
				node {
					slug
				}
			}
		}
	}`


	// 全てのカテゴリーslugを取得
	static allCategorySlugList = `query PostAllCategorySlugListQuery {
		categories {
			edges {
				node {
					slug
				}
			}
		}
	}`

	static categoryIdBySlug = `query PostCategoryIdBySlugQuery($id: ID!) {
		category(id: $id, idType: SLUG) {
			categoryId
		}
	}`
}