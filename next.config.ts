import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    
    remotePatterns : [
      {
        protocol:'https',
        hostname: 'ik.imagekit.io',
        port:""
      },
      {
        hostname:'cdn4.iconfinder.com'
      },
      {
        hostname:'cdn1.iconfinder.com'
      },
      {
        hostname:'images.icon-icons.com'
      },
      {
        hostname:"marcbruederlin.gallerycdn.vsassets.io"
      },
      {
        hostname:"next-auth.js.org"
      },
      {
        hostname:"cdn-icons-png.flaticon.com"
      },{
        hostname:"media.istockphoto.com"
      }
    ]
  }
};

export default nextConfig;
