"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
	const [search, setSearch] = useState("");
	const router = useRouter();

	useEffect(() => {
		router.push(`/?search=${search}`);
	}, [search]);

	return (
		<div className="p-24 pb-10 flex flex-col gap-4 items-center">
			<Image src="/pokeball.png" alt="Pokéball" width={50} height={50} />
			<h1 className="text-4xl font-bold text-white">Pokedex</h1>
		</div>
	);
}
