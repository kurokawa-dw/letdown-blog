import PostConst from "@/constants/PostConst"
import Link from "next/link"

const Pagination = ({total, sizePerPage, currentPage, path}: {
	total: number,
	sizePerPage: number,
	currentPage: number,
	path: string
}) => {
	// const total = 13
	// const sizePerPage = 1
	// const currentPage = 1
	const totalPage = Math.ceil(total/sizePerPage)

	return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-8 sm:px-6">

      <div className="flex sm:flex-1 sm:items-center sm:justify-center">

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Link
              href={`${path}/1`}
              className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
							</svg>

            </Link>

						<Link
              href={`${path}/${Math.max(1, currentPage-1)}`}
              className="relative inline-flex items-center px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
							</svg>
            </Link>


						{
							[...Array(PostConst.paginationAllBox)].map((_, i) => {
								let page
								const a = i + 1 // ページ番号 1スタートにする
								const b = currentPage + a - 2
								const c = totalPage - (PostConst.paginationAllBox - a)
								if(totalPage <= PostConst.paginationAllBox){
									if(totalPage < a) return
									page = a
								} else {
									if(a <= PostConst.paginationBrackPoint - 1){
										page = Math.max(a, Math.min(b, c))
									} else if(a == PostConst.paginationBrackPoint){
										page = b < c ? '...': c
									} else if(PostConst.paginationBrackPoint + 1 <= a){
										page = c
									}
								}


								return (
									<Link key={i} href={`${path}/${page}`} aria-current="page" className={currentPage == page ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}>
										{page}
									</Link>
								)
							})
						}


						<Link
              href={`${path}/${Math.min(totalPage, currentPage+1)}`}
              className="relative inline-flex items-center px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
							</svg>
            </Link>
            <Link
              href={`${path}/${totalPage}`}
              className="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
							</svg>

            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination