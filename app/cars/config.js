// Disable static optimization for /cars routes
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = 'force-no-store'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'

// Disable static page generation
export const generateStaticParams = () => {
  return []
}