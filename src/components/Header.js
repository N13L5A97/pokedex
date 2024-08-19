import Image from "next/image";

export default function Header({ onSearch, onFilter, sortOption, setSortOption }) {

    return (
        <div className="pt-10 flex flex-col items-center">
            <Image src="/pokeball.png" alt="Pokeball" width={100} height={100} />
            <h1 className="text-4xl font-bold mb-10 text-white text-center mt-5">Pokédex</h1>
        </div>
    );
}
