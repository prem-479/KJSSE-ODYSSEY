const isGithubActions = process.env.NEXT_PUBLIC_GITHUB_ACTIONS || false;
let repo = "";

// In a real Next.js app, we can use process.env.NEXT_PUBLIC_BASE_PATH
// which is often set during the build process.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function getAssetPath(path: string): string {
  if (path.startsWith("http")) return path;
  if (!path.startsWith("/")) path = `/${path}`;
  return `${basePath}${path}`;
}
