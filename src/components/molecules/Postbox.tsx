import PostType from "@/types/PostType"
import ArticleHeading from "../atoms/text/ArticleHeading"
import DateText from "../atoms/text/DateText"
import CategoryLabel from "../atoms/label/CategoryLabel"
import CommImage from "../atoms/image/CommImage"
import Link from "next/link"

const Postbox = ({post}: {post: PostType}) => {
	return (
		<article className='shadow-sm shadow-gray-200'>
			<div>
				<Link href={`/post/${post.slug}`}>
					<CommImage src={post.featuredImage.url} className="w-full h-56" alt="" />
				</Link>
			</div>
			<div className='py-4 px-5'>
				<div className="flex mb-2">
					<div className="mr-2">
						<Link href={`/category/${post.category.slug}`}>
							<CategoryLabel>{post.category.name}</CategoryLabel>
						</Link>
					</div>
					<DateText>{post.date}</DateText>
				</div>
				<div className="mb-2">
					<Link href={`/post/${post.slug}`}>
						<ArticleHeading>{post.title}</ArticleHeading>
					</Link>
				</div>
				<div dangerouslySetInnerHTML={{__html: post.excerpt}}></div>
			</div>
		</article>
	)
}

export default Postbox