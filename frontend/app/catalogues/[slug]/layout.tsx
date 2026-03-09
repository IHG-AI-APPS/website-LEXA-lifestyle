import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catalogue Viewer | LEXA Smart Home',
}

export default function CatalogueViewerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This layout removes the main header/footer for the catalogue viewer
  // The viewer has its own navigation bar
  return (
    <div className="catalogue-viewer-layout">
      {children}
    </div>
  )
}
