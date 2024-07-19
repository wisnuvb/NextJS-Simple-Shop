import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import debounce from "lodash/debounce";

interface SearchBarProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setQuery }) => {
  const [search, setSearch] = React.useState("");

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (!e.target.value) setQuery("");
  }, 400);

  const handleSearch = () => {
    setQuery(search);
  };

  return (
    <div className="relative flex items-center gap-2">
      <label
        htmlFor="email"
        className="relative text-gray-400 focus-within:text-gray-600 block"
      >
        <IoSearchOutline className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
        <input
          data-testid="search-input"
          type="text"
          onChange={handleChange}
          className="ring-1 ring-gray-300 py-2 pl-10 pr-2 rounded hover:outline-none focus-visible:outline-none text-sm sm:w-72"
          placeholder="Search products"
        />
      </label>
      <button
        type="button"
        data-testid="search-button"
        onClick={handleSearch}
        className="py-2 px-6 rounded bg-black text-gray-100 text-sm font-semibold"
      >
        Search
      </button>
    </div>
  );
};
