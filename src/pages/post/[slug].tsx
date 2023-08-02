import { NextPage } from "next"
import PostService from "@/services/PostService"
import PostType from "@/types/PostType"
import usePostSwr from "@/hooks/swr/usePostSwr"


type Repo = {
  name: string
  stargazers_count: number
}

const Post: NextPage<{
	slug: string,
  staticPost: PostType
}> = ({slug, staticPost}) => {
	const post = usePostSwr({ id: slug, staticPost })
	console.log(post)
	// console.log(staticPost)
	return (
		<>
			<div>
				{/* {post && post!.title} */}
				{/* {post && post!.content} */}
				{post && post!.content}
			</div>
			<div>
				{/* {staticPost.content} */}
				{/* {post && post!.content} */}
			</div>
		</>
	)
}

export const getStaticPaths = async () => {
	const paths = await PostService.getAllSlugList();
	// console.log(paths)
  return {
    paths: paths,
    fallback: false, // false or "blocking"
  }
}

export const getStaticProps = async ({params}: {params: {slug: string}}) => {
	const slug = params.slug
  const staticPost = await PostService.getOne({ id: slug })
  // const staticPost = await PostService.getOne({ id: 'test2' })
	console.log(staticPost)
	if (!staticPost) {
		return { notFound: true } // errorの場合404
	}

  return {
		props: {
			slug,
			staticPost
		},
		revalidate: 10 //wp更新後 最初にアクセスがあった10秒後にssgがbuild これすごいね

	}
}

export default Post