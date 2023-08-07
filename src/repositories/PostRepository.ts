import { WpGraphQlPostConst } from "@/constants/WpgraphQlConst";
import Repository from "./Repository";
import OffsetPaginationType from "@/types/OffsetPaginationType";

class PostRepository {
	static getList({offsetPagination, categoryId}: { //categoryIdという引数名は queryの引数でしているやつ
		offsetPagination: OffsetPaginationType,
		categoryId?: number
	}){

		if(categoryId){
			return Repository(
				WpGraphQlPostConst.listByCategory,
				{ variables: { offsetPagination, categoryId } }
			).getWp()
		} else {
			return Repository(
				WpGraphQlPostConst.list,
				{ variables: { offsetPagination } }
			).getWp()
		}

	}

	static getOne({ id }: { // idを引数にとる
		id: string
	}) {
		return Repository(
			WpGraphQlPostConst.one,
			{ variables: { id } } // ココが今までと違う！ これはNext公式のお作法だと思って
		).getWp()
	}

	// slug一覧を取得
	static getAllSlugList(){
		return Repository(WpGraphQlPostConst.allSlugList).getWp()
	}

	// slug一覧を取得
	static getAllCategorySlugList(){
		return Repository(WpGraphQlPostConst.allCategorySlugList).getWp()
	}


	// カテゴリーを取得
	static getCategoryIdBySlug({ slug }: {
		slug: string
	}){
		return Repository(
			WpGraphQlPostConst.categoryIdBySlug,
			{ variables: {id: slug} }
		).getWp()
	}

	static getTotal() {
		return Repository(WpGraphQlPostConst.total,).getWp()
	}
}

export default PostRepository