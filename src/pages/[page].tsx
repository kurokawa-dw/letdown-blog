import { NextPage } from 'next';
import Image from 'next/image'
import { Inter, Noto_Sans_JP } from 'next/font/google'
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
}> = ({ staticPostList, staticTotal, currentPage }) => {
	const [postList, total] = usePostListSwr({currentPage, staticPostList, staticTotal})
	// const postList = staticPostList

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
	const paths = await PostService.getAllPageList()

	return {
		paths,
		fallback: false
	}
}


export const getStaticProps = async ({ params }: {
	params: {
		page: string,
	}
}) => {
	const currentPage = parseInt(params.page);
	const [staticPostList, staticTotal] = await PostService.getList({page: currentPage})
	return {
		props: {
			staticPostList,
			staticTotal,
			currentPage
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