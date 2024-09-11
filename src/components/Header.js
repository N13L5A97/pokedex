import Image from "next/image";
import Link from "next/link";

export default function Header({ onSearch, onFilter, sortOption, setSortOption }) {

    return (
        <div>
            <Link href="/" className="flex flex-col items-center pt-10">
                <Image src="/pokeball.png" alt="Pokeball" width={100} height={100} />
                <h1 className="mt-5 mb-10 text-4xl font-bold text-center">Pokédex</h1>
            </Link>
        </div>
    );
}
