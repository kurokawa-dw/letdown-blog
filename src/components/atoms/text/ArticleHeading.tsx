import { ReactNode } from "react"

const ArticleHeading = ({ children }: {children: ReactNode}) => {
	return (
		<h1 className='font-bold'>{children}</h1>
	)
}

export default ArticleHeading