import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = "";
if (isGithubActions) {
  // Required only if not using a custom domain.
  const repoName = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "");
  repo = `/${repoName}`;
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
