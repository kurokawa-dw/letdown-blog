import { NextPage } from "next"
import PostService from "@/services/PostService"


import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'

type Repo = {
  name: string
  stargazers_count: number
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await PostService.getAllSlugList();
  return {
    paths: paths,
    fallback: false, // false or "blocking"
  }
}

export const getStaticProps: GetStaticProps<{repo: Repo}> = async () => {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  // const repo = await res.json()
  return { props: { } }
}

const Post: NextPage = () => {
	return (
		<div>
			記事詳細です
		</div>
	)
}

export default Post