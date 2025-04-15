import Link from 'next/link'
import Image from 'next/image'


export default function Navbar() {
    return (
        <nav className="bg-white text-black px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
                <span className="text-xl font-bold">Happy Paws</span>
            </div>
            <ul className="flex gap-4">
                <li className="px-7">
                    <Link href="/">REGISTRO</Link>
                </li>
                <li>
                    <Link href="/about">PACIENTES</Link>
                </li>
                <li className="px-7">
                    <Link href="/contact">HISTORIAL</Link>
                </li>
                <li className="px-7">
                    <Link href="/contact">CITAS</Link>
                </li>
            </ul>
        </nav>
    )
}
