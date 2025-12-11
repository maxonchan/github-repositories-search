export interface Owner {
  id: string;
  login: string;
  avatar_url: string;
}

export interface Repository {
  id: string;
  name: string;
  full_name: string;
  owner: Owner;
  description: string;
  language: string;
  forks_count: number;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
}
