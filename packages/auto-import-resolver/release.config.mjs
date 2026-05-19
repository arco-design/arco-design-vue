/**
 * @type {import('semantic-release').GlobalConfig}
 */
const githubReleaseBodyTemplate =
  "<% const notes = nextRelease.notes || ''; const maxLength = 120000; const suffix = '\n\n...\n\nRelease notes were truncated to fit the GitHub Release body limit. See CHANGELOG.md for the full entry.'; %><%= notes.length > maxLength ? notes.slice(0, maxLength - suffix.length) + suffix : notes %>";

export default {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'node ./scripts/prepare-release-package.mjs ${nextRelease.version}',
        publishCmd: 'pnpm publish ./dist --no-git-checks --access public',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [],
        releaseBodyTemplate: githubReleaseBodyTemplate,
      },
    ],
  ],
};
