'use client'
import { useEffect } from 'react'

export default function Construccion() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://tenor.com/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">🚧 Página en Construcción 🚧</h1>
      <p className="text-lg text-gray-600 mb-6">Estamos trabajando para traerte esta sección pronto.</p>
      
      {/* GIF de Tenor */}
      <div className="w-full max-w-md">
        <div
          className="tenor-gif-embed"
          data-postid="16601149"
          data-share-method="host"
          data-aspect-ratio="1"
          data-width="100%"
        >
          <a href="https://tenor.com/view/kitten-cat-typing-typing-cat-thank-goodness-gif-16601149">
            Kitten Cat GIF
          </a> from <a href="https://tenor.com/search/kitten-gifs">Kitten GIFs</a>
        </div>
      </div>
    </div>
  )
}
