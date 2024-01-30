/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const withTM = require("next-transpile-modules")(["@madzadev/audio-player"]);
module.exports = withImages(
  withTM({
    images: {
      disableStaticImages: true,
    },
	env: {
		BASE_URL: process.env.BASE_URL,
		FILE_SERVER: process.env.FILE_SERVER,
		STRAPI_API: process.env.STRAPI_API,
		GQL_API: process.env.GQL_API,
	},
  })
);


// /** @type {import('next').NextConfig} */
// const withImages = require("next-images");
// const withTM = require("next-transpile-modules")(["@madzadev/audio-player"]);
// module.exports = withImages(
//   withTM({
//     images: {
//       disableStaticImages: true,
//     },
//     nextConfig: {
//       reactStrictMode: true,
//     },
//     eslint: {
//       // Warning: This allows production builds to successfully complete even if
//       // your project has ESLint errors.
//       ignoreDuringBuilds: true,
//     },
//   })
// );
