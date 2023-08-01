import { NextPage } from 'next';
import Image from 'next/image'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import PostService from '@/services/PostService';
import PostType from '@/types/PostType';
import usePostListSwr from '@/hooks/swr/usePostListSwr';
import Postbox from '@/components/molecules/Postbox';
import Layout from '@/components/templates/Layout';

const inter = Inter({ subsets: ['latin'] });


const notojp = Noto_Sans_JP({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});


export async function getStaticProps() {
	const staticPostList = await PostService.getList()
	return {
		props: {
			staticPostList
		},
		revalidate: 10 //wp更新後 最初にアクセスがあった10秒後にssgがbuild これすごいね
	}
}

const Home: NextPage<{staticPostList: PostType[]}> = ({ staticPostList }) => {
	const postList = usePostListSwr(staticPostList)

	console.log(postList)
  return (
		<Layout>
			<div className='flex w-main mx-auto'>
				{postList!.map((post) => {
					// return <p key={post.id}>{post.title}</p> // 一個ずつ表示させる
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





export default Home