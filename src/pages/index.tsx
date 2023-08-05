import { NextPage } from 'next';
import Image from 'next/image'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import PostService from '@/services/PostService';
import PostOnListType from '@/types/PostOnListType';
import usePostListSwr from '@/hooks/swr/usePostListSwr';
import Postbox from '@/components/molecules/Postbox';
import Layout from '@/components/templates/Layout';



const Home: NextPage<{staticPostList: PostOnListType[]}> = ({ staticPostList }) => {
	const postList = usePostListSwr(staticPostList)

  return (
		<Layout>
			<div className='flex w-main mx-auto'>
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

export async function getStaticProps() {
	const staticPostList = await PostService.getList({})
	return {
		props: {
			staticPostList
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