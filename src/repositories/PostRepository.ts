import { WpGraphQlPostConst } from "@/constants/WpgraphQlConst";
import Repository from "./Repository";

class PostRepository {
	static getList(){
		return Repository(WpGraphQlPostConst.list).getWp()
	}
}

export default PostRepository