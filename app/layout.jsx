import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: 'promptopia',
    description: 'Discover and share AI prompts',
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <div className='main'>
                <div className='gradient' />
                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </div>
        </body>
    </html>
  )
}

export default RootLayout