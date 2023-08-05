import { WpGraphQlPostConst } from "@/constants/WpgraphQlConst";
import Repository from "./Repository";

class PostRepository {
	static getList({categoryId}: { //categoryIdという引数名は queryの引数でしているやつ
		categoryId?: number
	}){

		if(categoryId){
			return Repository(
				WpGraphQlPostConst.listByCategory,
				{ variables: { categoryId } }
			).getWp()
		} else {
			return Repository(WpGraphQlPostConst.list).getWp()
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
}

export default PostRepository