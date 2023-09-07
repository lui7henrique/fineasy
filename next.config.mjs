import million from 'million/compiler'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
}

const millionConfig = {
  auto: { rsc: true },
}

export default million.next(nextConfig, millionConfig)
