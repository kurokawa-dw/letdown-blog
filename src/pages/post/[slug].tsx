import { NextPage } from "next"
import PostService from "@/services/PostService"
import PostType from "@/types/PostType"
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'
import usePostSwr from "@/hooks/swr/usePostSwr"


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
	const slug = params.slug
  const staticPost = await PostService.getOne({ id: slug })

	if (!staticPost) {
		return { notFound: true } // errorの場合404
	}

  return {
		props: {
			slug,
			staticPost
		},
		revalidate: 10

	}
}

const Post: NextPage<{
	slug: string
	staticPost: PostType
}> = ({staticPost, slug}) => {
	const post = usePostSwr({ id: slug, staticPost })
	return (
		<>
			<div>
				{post && post!.title}
			</div>
			<div>
				{post && post!.content}
			</div>
		</>
	)
}

export default Post