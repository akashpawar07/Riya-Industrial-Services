/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // Previous hostnames you added...
            { protocol: 'https', hostname: 'logos-world.net' },
            { protocol: 'https', hostname: 'www.essar.com' },
            { protocol: 'https', hostname: 'upload.wikimedia.org' },
            { protocol: 'https', hostname: 'iticampus.co.in' },
            { protocol: 'https', hostname: 'toppng.com' },
            { protocol: 'https', hostname: 'etimg.etb2bimg.com' },
            { protocol: 'https', hostname: 'cdn.worldvectorlogo.com' },
            { protocol: 'https', hostname: 'seeklogo.com' },

            // New hostname for Freepik images
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.freepik.com',
                pathname: '/**',
            },
        ].map(pattern => ({ ...pattern, pathname: pattern.pathname || '/**' })),
    },
};

export default nextConfig;
