/// <reference types="vite/client" />

declare module "virtual:post-snapshots" {
  export const postSnapshots: Record<string, () => Promise<{
    default: import("./data/posts").PostContentPayload;
  }>>;
}
