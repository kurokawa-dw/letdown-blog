import useSWR from 'swr'
import { WpGraphQlPostConst } from '@/constants/WpgraphQlConst'
import PostType from '@/types/PostType'
import PostService from '@/services/PostService'

const usePostSwr = ({ id, staticPost }: {
	id: string,
	staticPost: PostType
}) => {
	const { data: post } = useSWR(
		[WpGraphQlPostConst.list, id], //　Keyを配列にもできる
		([_, id]) => PostService.getOne({ id }), // 使うのはidだけなので第一引数はアンダースコアに
		{ fallbackData: staticPost } //初期値
	)
	return post
}

export default usePostSwr


/**
 * useSWRでnullが帰ってきちゃってた原因
 * ([_, id]) => PostService.getOne({ id }),
 * コールバックの引数は配列で！
 * 公式ドキュメントに書いてあった
 * https://swr.vercel.app/ja/docs/arguments
 */
