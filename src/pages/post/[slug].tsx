import { NextPage } from "next"
import PostService from "@/services/PostService"
import PostType from "@/types/PostType"
import usePostSwr from "@/hooks/swr/usePostSwr"
import Layout from "@/components/templates/Layout"
import CommImage from "@/components/atoms/image/CommImage"
import CategoryLabel from "@/components/atoms/label/CategoryLabel"
import DateText from "@/components/atoms/text/DateText"
import PostHeading from "@/components/atoms/text/postHeading"
import Link from "next/link"

const Post: NextPage<{
	slug: string,
  staticPost: PostType
}> = ({slug, staticPost}) => {
	const post = usePostSwr({ id: slug, staticPost })
	// console.log(post)
	// console.log(staticPost)
	return (
		<Layout>
			<div className="w-main mx-auto">
				<article>
					<div className="mb-10">
						<CommImage
							src={post!.featuredImage.url}
							className="w-full h-96"
							alt="" />
					</div>
					<div className="flex mb-10">
						<div className="mr-5">
							<Link href={`/category/${post!.category.slug}`}>
								<CategoryLabel>{post!.category.name}</CategoryLabel>
							</Link>
						</div>
						<DateText>{post!.date}</DateText>
					</div>
					<div className="mb-10">
						<PostHeading>{post!.title}</PostHeading>
					</div>

					<div dangerouslySetInnerHTML={{__html: post!.content}}></div>
				</article>
			</div>
		</Layout>
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
	// console.log(staticPost)
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