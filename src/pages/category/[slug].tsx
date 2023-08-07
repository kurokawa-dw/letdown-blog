import PostService from "@/services/PostService"
import { NextPage } from 'next';
import PostOnListType from '@/types/PostOnListType';
import usePostListSwr from '@/hooks/swr/usePostListSwr';
import Postbox from '@/components/molecules/Postbox';
import Layout from '@/components/templates/Layout';



const PostListByCategory: NextPage<{
	categoryId: number
	staticPostList: PostOnListType[]
}> = ({categoryId, staticPostList }) => {
	const [postList, _] = usePostListSwr({currentPage: 1, categoryId, staticPostList, staticTotal: 9})
	// const postList = staticPostList
	console.log(postList)

  return (
		<Layout>
			<div className='flex flex-wrap w-main mx-auto'>
				{postList!.map((post) => {
					return (
						<div key={post.id} className='w-1/3 pr-4 pb-4 [&:nth-child(3n)]:pr-0'>
							<Postbox post={post} />
						</div>
					)
				})}
			</div>
		</Layout>
  )
}

export const getStaticPaths = async () => {
	const paths = await PostService.getAllCategorySlugList()
	return {
		paths: paths,
		fallback: false
	}
}

export const getStaticProps = async ({ params }: {
	params: {
		slug: string
	}
}) => {
	const slug = params.slug
	const categoryId = await PostService.getCategoryIdBySlug({ slug });
	const [staticPostList, _] = await PostService.getList({ page: 1, categoryId })

	return {
		props: {
			categoryId,
			staticPostList
		},
		revalidate: 10
	}
}

export default PostListByCategory