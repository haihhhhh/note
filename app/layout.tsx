import Sidebar from '@/components/Sidebar'
import '@/style/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Provider store={store}> */}
        <div className="container">
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
        {/* </Provider> */}
      </body>
    </html>
  )
}
