export default function Header() {
	return (
		<div className="p-10">
			<h1 className="text-4xl font-bold mb-10 text-white">Pokedex</h1>
			{/* search option */}
			<input
				type="text"
				placeholder="Search for a Pokemon"
				className="w-full p-2 rounded-lg mb-10"
			/>
			{/* filter option */}
			{/* <div className="mb-10 flex">
        <label>
          Fire
          <input type="checkbox" name="filter" value="fire" />
        </label>
        <label>
          Water
          <input type="checkbox" name="filter" value="water" />
        </label>
      </div> */}
		</div>
	);
}
