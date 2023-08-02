import useSWR from 'swr'
import { WpGraphQlPostConst } from '@/constants/WpgraphQlConst'
import PostType from '@/types/PostType'
import PostService from '@/services/PostService'

// const usePostSwr = ({id, staticPost}: {
// 	id: string,
// 	staticPost: PostType
// }) => {
// 	const {data: post} = useSWR(
// 		[WpGraphQlPostConst.list, id],
// 		(_, id: string) => PostService.getOne({id}),
// 		{fallbackData: staticPost}
// 	)
// 	return post
// }

const usePostSwr = ({ id, staticPost }: {
	id: string,
	staticPost: PostType
}) => {
	const { data: post } = useSWR(
			[WpGraphQlPostConst.list, id], //　Keyを配列にもできる
			(_, id) => PostService.getOne({ id }), // 使うのはidだけなので第一引数はアンダースコアに
			{ fallbackData: staticPost }
	)
	return post
}

export default usePostSwr

