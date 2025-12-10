"use client";

import { useState } from "react";

export default function SearchBar({
  onSearch = () => {},
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  return (
    <div className="relative max-w-4xl mx-auto w-full h-16 group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative w-full h-full">
        <input
          type="text"
          placeholder="Search repositories..."
          className="w-full h-full pl-14 pr-32 py-4 rounded-full border border-gray-200 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-100 text-lg placeholder-gray-400 transition-shadow duration-200 group-hover:shadow-xl"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(query);
            }
          }}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <button
          type="button"
          className="absolute top-3 right-4 h-10 rounded-full bg-blue-500 px-3 py-2 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          disabled={query.length === 0}
          onClick={() => {
            onSearch(query);
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}
