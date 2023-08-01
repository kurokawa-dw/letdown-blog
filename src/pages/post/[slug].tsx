import { NextPage } from "next"
import PostService from "@/services/PostService"
import PostType from "@/types/PostType"



import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'

type Repo = {
  name: string
  stargazers_count: number
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
  const staticPost = await PostService.getOne({id: params.slug})
  return { props: { staticPost } }
}

const Post: NextPage<{staticPost: PostType}> = ({staticPost}) => {
	// console.log(staticPost)
	return (
		<div>
			{staticPost.title}
		</div>
	)
}

export default Post