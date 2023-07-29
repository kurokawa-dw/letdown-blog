import { NextPage } from 'next';
import Image from 'next/image'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import PostService from '@/services/PostService';
import PostType from '@/types/PostType';
import usePostListSwr from '@/hooks/swr/usePostListSwr';

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
    <div className='flex'>
      {postList!.map((post) => {
        // return <p key={post.id}>{post.title}</p> // 一個ずつ表示させる
				return (
					<div key={post.id} className='w-1/3 p-4'>
						<article className='shadow-sm shadow-gray-200'>
							<div>
								<img className='w-full h-56 object-cover' src={post.featuredImage.url} alt="" />
							</div>
							<div>
								<span>{post.category.name}</span>
								<h1 className='font-bold'>{post.title}</h1>
								<span>{post.date}</span>
								{/* {post.excerpt} */}
							</div>
						</article>
					</div>
				)
      })}
    </div>
  )
}





export default Home