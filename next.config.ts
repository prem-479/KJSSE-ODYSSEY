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
  basePath: repo,
  assetPrefix: repo,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
