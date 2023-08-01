/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	images: {
    domains: [
    	process.env.NEXT_PUBLIC_WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
			process.env.ALLOWED_IMAGE_HOST
    ],
  },
}

module.exports = nextConfig
