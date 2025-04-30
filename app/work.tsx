import { prisma } from '@/src/lib/prisma'
import Navbar from './components/Navbar'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default async function Layout({ children }: Props) {
  const tipos = await prisma.tipoMascota.findMany()

  const showConstruction = true

  return (
    <>
      <Navbar />

      {showConstruction ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
          <h1 className="text-4xl font-bold mb-4">🚧 Página en construcción 🚧</h1>

          {/* Contenedor para el iframe embebido de Tenor */}
          <div
            className="w-full max-w-md"
            dangerouslySetInnerHTML={{
              __html: `
                <div class="tenor-gif-embed" data-postid="14779987" data-share-method="host" data-aspect-ratio="1" data-width="100%">
                  <a href="https://tenor.com/view/cats-computer-hack-anon-anonymous-gif-14779987">Cats Computer GIF</a>
                  from <a href="https://tenor.com/search/cats-gifs">Cats GIFs</a>
                </div>
                <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
              `,
            }}
          />

          <p className="mt-4 text-lg text-gray-600">
            Estamos trabajando para traerte algo increíble. ¡Vuelve pronto!
          </p>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </>
  )
}
