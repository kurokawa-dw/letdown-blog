export class WpGraphQlPostConst {
	static list = `query PostListQuery {
		posts {
			edges {
				node {
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
				}
			}
		}
	}`

	static one = `query PostQuery($id: ID!) {
		post(id: $id, idType: SLUG) {
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
		}
	}`

	static allSlugList = `query PostAllSugListQuery {
		posts(first: 10000) {
			edges {
				node {
					slug
				}
			}
		}
	}`
}