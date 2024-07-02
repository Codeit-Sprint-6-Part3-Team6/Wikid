/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["sprint-fe-project.s3.ap-northeast-2.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 프록시할 경로 패턴
        destination: "https://wikied-api.vercel.app/:path*", // 실제 API 서버 주소
      },
    ];
  },
};

export default nextConfig;
