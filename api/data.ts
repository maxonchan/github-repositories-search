export async function fetchRepositories({
  query,
  perPage = 10,
  page = 1,
}: {
  query: string;
  perPage?: number;
  page?: number;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/search/repositories?per_page=${perPage}&page=${page}&q=${query}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch repositories");
  }
  const data = await res.json();
  return data;
}