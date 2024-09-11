'use client';

export default function SortingOptions({ sortOption, onSortChange }) {
    return (
        <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="p-2 text-black rounded-md"
        >
            <option value="index-asc">Sort by Index (asc)</option>
            <option value="index-desc">Sort by Index (desc)</option>
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
        </select>
    );
}
