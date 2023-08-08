/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	images: {
    domains: [
    	process.env.NEXT_PUBLIC_WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
			process.env.ALLOWED_IMAGE_HOST
    ],
  },

	// ルートを変更
	async rewrites() {
		return [
			{
				source: '/',
				destination: '/post/params/page/1'
			},
			{
				source: '/page/:page',
				destination: '/post/params/page/:page'
			},
			{
				source: '/category/:category',
				destination: '/post/params/category/:category/page/1'
			},
			{
				source: '/category/:category/page/:page',
				destination: '/post/params/category/:category/page/:page'
			}
		]
	}
}

module.exports = nextConfig
