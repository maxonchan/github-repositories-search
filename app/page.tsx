"use client";

import { useState } from "react";
import type { Repository } from "@/types";
import SearchBar from "@/components/SearchBar";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Pagination from "@/components/Pagination";
import { fetchRepositories } from "@/api/data";
import { formatDate, formatNumber } from "@/util/tool";

const languageColorMap: { [key: string]: string } = {
  "Dart": "0175C2",
  "Swift": "F05138",
  "Kotlin": "A97BFF",
  "Objective-C": "438eff",
  "Shell": "89e051",
  "C": "555",
  "HTML": "e34c26",
  "CSS": "563d7c",
  "Markdown": "000000",
  "SQL": "00758F",
  "Vue": "4FC08D",
  "Ruby": "701516",
  "JavaScript": "f1e05a",
  "TypeScript": "2b7489",
  "Python": "3572A5",
  "Java": "b07219",
  "Rust": "dea584",
  "Go": "00ADD8",
  "C++": "f34b7d",
  "C#": "178600",
  "PHP": "4F5D95",
};

interface RepositoriesResProps {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

type Page = number | string;

export default function Home() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [repositoriesRes, setRepositoriesRes] = useState<RepositoriesResProps | null>(null);
  const search = async (query: string) => {
    console.log("Searching for:", query);
    setQuery(query);
    setPage(1);
    fetchRepos(query, 1);
  }

  const fetchRepos = async ( query: string, page?: number) => { 
    const repositoriesRes: RepositoriesResProps = await fetchRepositories({ query, page });
    setRepositoriesRes(repositoriesRes);
    setTotalCount(repositoriesRes.total_count > 80 ? 80 : repositoriesRes.total_count);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="min-h-screen w-full bg-grey-300">
        <div className="w-full bg-linear-to-b from-white to-gray-100 p-8">
          <h1 className="text-6xl py-10 font-bold text-center text-zinc-900">
            GitHub Repositories
          </h1>
          <SearchBar onSearch={search} />
        </div>
        <div className="grid grid-cols-3 gap-8 w-full p-10">
          {
            repositoriesRes?.items.map((repo) => (
              <Card
                key={repo.id}
                title={repo.name}
                avatar={repo.owner.avatar_url}
              >
                <div className="flex flex-col justify-between gap-4 h-full">
                  <p className="line-clamp-2">{repo.description}</p>
                  <div className="flex flex-wrap items-start gap-1 py-1">
                    {repo.topics.slice(0, 4).map((topic: string) => (<Tag key={topic} title={topic} className="mr-2" />))}
                  </div>
                  <div className="flex">
                    <div className="flex items-center gap-1 mr-4">
                      <span 
                        className="block w-2 h-2 rounded-full"
                        style={{ backgroundColor: `#${languageColorMap[repo.language]}` || 'gray' }}
                      ></span>
                      <span>{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-1 mr-4">
                      <svg className="w-5 h-5 inline-block fill-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor" />
                      </svg>
                      <span>{formatNumber(repo.stargazers_count)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Updated on {formatDate(repo.updated_at)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          }
        </div>
        <div className="pb-8">
          <Pagination
            currentPage={page}
            totalPages={totalCount}
            onPageChange={(page?: Page) => {
              if (typeof page === "number") {
                setPage(page);
                fetchRepos(query, page);
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}
