"use client";

import SearchBar from "@/components/SearchBar";

export default function Home() {
  const search = (query: string) => {
    console.log(query);
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="min-h-screen w-full bg-grey-300 dark:bg-black">
        <div className="w-full bg-linear-to-b from-white to-gray-100 p-8">
          <h1 className="text-6xl py-10 font-bold text-center text-zinc-900 dark:text-white">
            GitHub Repositories
          </h1>
          <SearchBar onSearch={search} />
        </div>
      </main>
    </div>
  );
}
