/** @type {import('next').NextConfig} */
const nextConfig = {
    // distDir:'production_build',
	reactStrictMode: false,
	swcMinify: true,
	images: {
		unoptimized: true
	}
}

// const nextConfig = {
// 	reactStrictMode: true,
// 	swcMinify: true,
// 	images: {
// 		unoptimized: true
// 	}
// };
module.exports = nextConfig

