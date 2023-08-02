import { WpGraphQlPostConst } from "@/constants/WpgraphQlConst";
import Repository from "./Repository";

class PostRepository {
	static getList(){
		return Repository(WpGraphQlPostConst.list).getWp()
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
}

export default PostRepository