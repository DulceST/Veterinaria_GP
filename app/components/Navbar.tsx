import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
    const handleLogout = () => {
        console.log("Cerrar sesión"); // Aquí podrías poner tu lógica de logout
    }

    return (
        <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
                <span className="text-xl font-bold">Happy Paws</span>
            </div>

            <ul className="flex items-center gap-4">
                <li className="px-7">
                    <Link href="/registro">REGISTRO</Link>
                </li>
                <li>
                    <Link href="/pacientes">PACIENTES</Link>
                </li>
                <li className="px-7">
                    <Link href="/construccion">HISTORIAL</Link>
                </li>
                <li className="px-7">
                    <Link href="/construccion">CITAS</Link>
                </li>

                {/* Imagen de cerrar sesión */}
                <li className="cursor-pointer">
                    <Image 
                        src="/sesion.png" 
                        alt="Cerrar sesión" 
                        width={30} 
                        height={30}                       
                        onClick={handleLogout} 
                        title="Cerrar sesión"
                    />
                </li>
            </ul>
        </nav>
    )
}
