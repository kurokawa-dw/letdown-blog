import { WpGraphQlPostConst } from "@/constants/WpgraphQlConst";
import Repository from "./Repository";

class PostRepository {
	static getList(){
		return Repository(WpGraphQlPostConst.list).getWp()
	}

	static getOne({ id }: {
		id: string
	}){
		return Repository(WpGraphQlPostConst.one,{variables: {id: id}}).getWp()
	}

	static getAllSlugList(){
		return Repository(WpGraphQlPostConst.allSlugList).getWp()
	}
}

export default PostRepository