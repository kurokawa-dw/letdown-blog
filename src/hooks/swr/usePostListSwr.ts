import useSWR from 'swr'
import { WpGraphQlPostConst } from '@/constants/WpgraphQlConst'
import PostOnListType from '@/types/PostOnListType'
import PostService from '@/services/PostService'

const usePostListSwr = ({ currentPage, categoryId, staticPostList, staticTotal}: {
	currentPage: number
	categoryId?: number
	staticPostList: PostOnListType[]
	staticTotal: number
}) => { // 初期値を引数にとる
	let key, fetcher

	if(categoryId){
		key = [WpGraphQlPostConst.categoryIdBySlug, currentPage, categoryId]
		fetcher = ([_, page, categoryId]: [string, number, number]) => PostService.getList({page: page, categoryId})
	} else {
		key = [WpGraphQlPostConst.list, currentPage]
		fetcher = ([_, page]: [string, number]) => PostService.getList({page: page})
	}

	const {data} = useSWR<[PostOnListType[], number]>(
		key, // key
		fetcher, // fetcher
		{fallbackData: [staticPostList, staticTotal]}) // 初期値
	return data ?? [staticPostList, staticTotal]
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

