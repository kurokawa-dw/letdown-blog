import useSWR from 'swr'
import { WpGraphQlPostConst } from '@/constants/WpgraphQlConst'
import PostOnListType from '@/types/PostOnListType'
import PostService from '@/services/PostService'

const usePostListSwr = ({categoryId, staticPostList}: {
	categoryId?: number
	staticPostList: PostOnListType[]
}) => { // 初期値を引数にとる
	let key, fetcher

	if(categoryId){
		key = [WpGraphQlPostConst.categoryIdBySlug, categoryId]
		fetcher = ([_, categoryId]: [string, number]) => PostService.getList({page: 1, categoryId})
	} else {
		key = [WpGraphQlPostConst.list,]
		fetcher = ([_]: [string]) => PostService.getList({page: 3})
	}

	const {data: postList} = useSWR(
		key, // key
		fetcher, // fetcher
		{fallbackData: staticPostList}) // 初期値
	return postList
}

export default usePostListSwr

/**
 * useSWRについて
 * {data: postList}のところは本来↓こんな感じで書くけど、dataをpostListという名前に変更しているだけっぽい
 * const { data, error } = useSWR('/api/user', fetcher)
 *
 * こんな書き方あるんだ。下記URL参考
 * https://zenn.dev/fbd_tech/books/519201590c4e98/viewer/b56962
 */

