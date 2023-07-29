// export class WpGraphQlPostConst {
// 	static list = `query PostListQuery {
// 		posts {
// 			edges {
// 				node {
// 					title
// 					id
// 					date
// 					content
// 				}
// 			}
// 		}
// 	}`
// }

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
}