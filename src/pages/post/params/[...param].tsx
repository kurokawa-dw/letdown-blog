import { NextPage } from 'next';
import Image from 'next/image'
import PostService from '@/services/PostService';
import PostOnListType from '@/types/PostOnListType';
import usePostListSwr from '@/hooks/swr/usePostListSwr';
import Postbox from '@/components/molecules/Postbox';
import Layout from '@/components/templates/Layout';
import PostConst from '@/constants/PostConst';
import Pagination from '@/components/molecules/Pagination';



const Home: NextPage<{
	staticPostList: PostOnListType[],
	staticTotal: number,
	currentPage: number
	staticCategoryId: number | null
}> = ({ staticPostList, staticTotal, currentPage, staticCategoryId }) => {
	const categoryId = staticCategoryId ?? undefined
	const [postList, total] = usePostListSwr({currentPage, staticPostList, staticTotal, categoryId})
	// const [postList, total] = [staticPostList, staticTotal]

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
			<Pagination
				total={total}
				sizePerPage={PostConst.sizePerPage}
				currentPage={currentPage}
				path=''
			 />
		</Layout>
  )
}

export const getStaticPaths = async () => {
	const paths = await PostService.getAllPageAndCategoryList()

	return {
		// この形が欲しのでPostService.getAllPageAndCategoryListで生成
		// paths: [
		// 	{ params: { param: ['page', '1'] } },
		// 	{ params: { param: ['page', '2'] } },
		// 	{ params: { param: ['category', 'test', 'page', '1'] } },
		// 	{ params: { param: ['category', 'test', 'page', '2'] } },
		// 	{ params: { param: ['category', 'test2', 'page', '1'] } }
		// ],
		paths,
		fallback: false
	}
}


export const getStaticProps = async ({ params }: {
	params: {
		// page: string,
		param: [string, string] | [string,string,string,string]
	}
}) => {
	// console.log(params.param)
	const param = params.param
	let currentPage = 1
	let categoryId: number | undefined

	if(param.length === 2 && param[0] === 'page'){
		currentPage = parseInt(param[1])
	} else if(param.length === 4 && param[0] === 'category' && param[2] === 'page'){
		categoryId = await PostService.getCategoryIdBySlug({ slug: param[1] });
		currentPage = parseInt(param[3])
	}

	const [staticPostList, staticTotal] = await PostService.getList({page: currentPage, categoryId})
	return {
		props: {
			staticPostList,
			staticTotal,
			currentPage,
			staticCategoryId: categoryId ?? null
		},
		revalidate: 10 //wp更新後 最初にアクセスがあった10秒後にssgがbuild これすごいね
	}
}

export default Home




/**
 * const Home = ()=>{
 * 	この中でのコードはフロント側の処理
 * }
 */

/**
 * postList!.map((post) => {
 * の「!」は非nullアサーションといって、
 * 通常の場合、postList（配列やオブジェクト）がnullだった場合エラーがでるが、
 * !をつけるとエラーを無視してコードを実行する
 * typescriptの構文
 */