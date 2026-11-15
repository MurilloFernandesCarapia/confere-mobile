/// <reference types="node" />

import { execSync } from "child_process";
import { ConfigContext, ExpoConfig } from "expo/config";

function lerCommitHash() {
  if (process.env.EAS_BUILD_GIT_COMMIT_HASH) {
    return process.env.EAS_BUILD_GIT_COMMIT_HASH.slice(0, 7);
  }

  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "sem-commit";
  }
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name ?? "Confere",
  slug: config.slug ?? "confere-mobile",
  extra: {
    ...config.extra,
    commitHash: lerCommitHash(),
  },
});
