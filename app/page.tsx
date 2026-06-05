import React from 'react'
import type { Metadata } from 'next'
import Home from './home/page'
import { buildMetadata } from '../lib/seo/metadata'
import { siteConfig } from '../lib/seo/config'

export const metadata: Metadata = buildMetadata({
  title: siteConfig.fullName,
  description: siteConfig.description,
  path: '/',
  canonical: '/',
  keywords: [...siteConfig.keywords],
})

const page = () => {
  return (
    <div>
      <Home />
    </div>
  )
}

export default page