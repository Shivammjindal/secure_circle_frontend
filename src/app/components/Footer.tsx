'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

function Footer() {

  const year = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground border-t pt-6">
      <Card className="dark:bg-black max-w-7xl mx-auto shadow-none border-none">
        <CardContent className="flex flex-col md:flex-row justify-between gap-10 px-4 md:px-8 pb-10">
          {/* Left Section */}
          <div className="flex flex-col gap-4 md:w-1/3">
            <Link
              href="/"
              className="text-4xl font-bold bg-gradient-to-r from-sky-600 via-green-600 to-purple-600 bg-clip-text text-transparent"
            >
              Secure Circle
            </Link>

            <div className="flex gap-4 mt-2">
              <Link href="https://twitter.com/shivam_302003">
                <Image
                  src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/twitter-512.png"
                  alt="Twitter"
                  width={40}
                  height={40}
                />
              </Link>
              <Link href="https://www.linkedin.com/in/shivam-jindal-23833624a/">
                <Image
                  src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"
                  alt="LinkedIn"
                  width={40}
                  height={40}
                />
              </Link>
              <Link href="https://github.com/Shivammjindal">
                <Image
                  src="https://images.icon-icons.com/3685/PNG/512/github_logo_icon_229278.png"
                  alt="GitHub"
                  width={40}
                  height={40}
                />
              </Link>
            </div>

            <p className="text-muted-foreground text-sm mt-4">
              © {year} Secure Circle. All rights reserved.
            </p>
          </div>

          {/* Center Section */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-3 text-muted-foreground">
              Open Source Contribution
            </h3>
            <Link
              // href="https://github.com/Shivammjindal/BlogifyApp"
              href={'https://google.com'}
              className="text-primary hover:underline"
            >
              Contribute for Secure Environment for Everyone
            </Link>

            <div className="flex gap-4 mt-4">
              <Link href="https://nextjs.org/">
                <Image
                  src="https://marcbruederlin.gallerycdn.vsassets.io/extensions/marcbruederlin/next-icons/0.1.0/1723747598319/Microsoft.VisualStudio.Services.Icons.Default"
                  alt="Next.js"
                  width={40}
                  height={40}
                />
              </Link>
              <Link href="https://next-auth.js.org/">
                <Image
                  src="https://next-auth.js.org/img/logo/logo-sm.png"
                  alt="NextAuth"
                  width={40}
                  height={40}
                />
              </Link>
              <Link href="https://en.wikipedia.org/wiki/Machine_learning">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/8618/8618881.png"
                  alt="Machine Learning"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-3 text-muted-foreground">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/aboutus" className="hover:underline">
                About Us
              </Link>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
