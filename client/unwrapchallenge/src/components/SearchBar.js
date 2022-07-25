import { useState } from "react";

const SearchBar = ({ category, onSubmit }) => {
    const [search, setSearch] = useState('')
    

    return (
        <input
            type='text'
            placeholder={category.placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={onSubmit}
        />
    )
}

export default SearchBar;