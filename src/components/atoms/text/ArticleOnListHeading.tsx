import { ReactNode } from "react"

const ArticleOnListHeading = ({ children }: {children: ReactNode}) => {
	return (
		<h1 className='font-bold'>{children}</h1>
	)
}

export default ArticleOnListHeading