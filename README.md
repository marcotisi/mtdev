# Marco Tisi Development Monorepo

## Usage

This monorepo contains a collection of useful libraries and packages:

- `@mtdev/react-wizard` - A primitive React Wizard package

Install all the dependencies in the root directory. Since the monorepo uses Lerna and Yarn Workspaces, npm CLI is not supported (only yarn).

```sh
yarn install
```

This will install all dependencies in each project, build them, and symlink them via Lerna

## Development workflow

In one terminal, run `yarn start`:

```sh
yarn start
```

This builds each package to `<packages>/<package>/dist` and runs the project in watch mode so any edits you save inside `<packages>/<package>/src` cause a rebuild to `<packages>/<package>/dist`. The results will stream to to the terminal.
