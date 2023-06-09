# Fitness Tracker v17

_Project Archived_

Fitness Tracker is a simple application for tracking workouts, exercises, and measurements. You can
view charts of your progress and export your data at any time.

## TODO

- [ ] Components to display previous values on the `Dashboard Parent Cards`

  - [ ] `Workouts`
  - [ ] `Exercises`
  - [ ] `Measurements`

- [ ] `ActionSetInputs`

  - [ ] Build SETS and NO_SETS `v-if` blocks for `ActionSetInputs` (check parent `ExerciseInputs`)
  - [ ] Put on set components inside of `ActionSetInputs` (listed below)
  - [ ] Build Column design for `ActionSetInputs` component
  - [ ] Build `Add` and `Remove` set functionality
  - [ ] `ActionInputReps`
  - [ ] `ActionInputWeightLbs`
  - [ ] `ActionInputDistanceMiles`
  - [ ] `ActionInputDurationMinutes`
  - [ ] `ActionInputResistance`

- [ ] Build `Chart` components for `chart-blueprints`

  - [ ] `ChartWorkoutDuration`
  - [ ] `ChartExerciseReps`
  - [ ] `ChartExerciseWeight`
  - [ ] `ChartExerciseDistance`
  - [ ] `ChartExerciseDuration`
  - [ ] `ChartExerciseResistance`
  - [ ] `ChartVitals` (color gradients, threshold dashes on chart?)

- [ ] Chart Options Example:

  ```typescript
  export const numberChart: ChartBlueprint = {
    label: 'Numbers',
    chartOptions: {
      reactive: true,
      responsive: true,
      radius: 2,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: (tooltipItem: any) => {
              return date.formatDate(tooltipItem?.[0]?.label, 'ddd, YYYY MMM D, h:mm a')
            },
          },
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxRotation: 70,
            minRotation: 70,
          },
        },
      },
    },
    component: defineAsyncComponent(() => import('@/components/charts/ChartNumbers.vue')),
  }
  ```

- [ ] Show a bell and `Description` if no inputs on `ExerciseInput` (do not save record)
- [ ] Test overall functionality with defaults (actions, views, etc.)
- [ ] Separate import function for legacy `fitness-tracker-v16` data records in `Settings`

  - [ ] Use `workouts` key
  - [ ] Use `exercises` key
  - [ ] Use `measurements` key
  - [ ] Use `workoutRecords` key
  - [ ] Use `exerciseRecords` key
  - [ ] Use `measurementRecords` key

- [ ] Implement `Active Workout` view

  - [ ] Exercise inputs should display previous performance (135 lbs, as orange placeholder text?)
  - [ ] Feature to view previous performance increments for exercies (5, 5, -5, 10, -10, as a
        dialog?)
  - [ ] Feature that makes additonal `Inspect` field for exercises that summarizes data (see below)
    - `(1)` 105x15
    - `(2)` 115x10
    - `(3)` 125x5
  - [ ] Feature for `Inspect` or other option to view workout `Metadata` (maybe in charts?)
    - `(heaviest weight)` 125
    - `(total lifted)` 3350
    - `(total reps)` 30

- [ ] Find out how to remove Typescript config errors if possible

## Post Cloning Steps

- [ ] Generate a new Favicon here: <https://favicon.io/> (credit original artists)

- [ ] Update `README.md`

  - [ ] Update the `Credits` section as needed
  - [ ] Remove unneeded sections (including this one)

## Table of Contents

- [Usage](#usage)
- [Project Creation Steps](#project-creation-steps)
- [Additional Notes](#additional-notes)
- [Credits](#credits)

## Usage

Install the project dependencies.

```sh
npm i
```

Launch the dev server site.

```sh
npm run dev
```

Build the project `dist` directory.

```sh
npm run build
```

Preview application using built `dist` artifacts.

```sh
npm run preview
```

Run tests.

```sh
npm test
```

Run tests with coverage report.

```sh
npm test:coverage
```

Removes previous GitHub Pages deployment.

```sh
npm run deploy:clean-gh-pages
```

Build and deploy the `dist` directory to GitHub Pages.

```sh
npm run deploy:gh-pages
```

Check for outdated packages.

```sh
npm outdated
```

Update packages based on `package.json` version settings. Test updates to ensure they worked.

```sh
npm upgrade
```

## Project Creation Steps

Details on the general steps I took to setup this project. This isn't intended as a step-by-step
guide on how to replicate this project, but is a good starting point.

1. Create an empty repository in GitHub with a `PROJECT_NAME`
1. Run `npm init @vue/latest` in your local Projects directory:
   - Name the project `PROJECT_NAME`
   - TypeScript - Yes
   - JSX - No
   - Vue Router - Yes
   - Pinia - Yes
   - ViTest - Yes
   - End-to-End Testing - No
   - ESLint - Yes
   - Prettier - Yes
1. Install useful dependencies:
   - `npm i slugify` - For making URL slug from text
   - `npm i dexie` - IndexedDB wrapper
   - `npm i -D gh-pages` - GitHub Pages deployment
   - `npm i -D @vitest/coverage-c8` - test coverage output
   - `npm i @vueuse/core` - Vue component utilities
   - `npm i chart.js vue-chartjs` - Chart.js with a Vue wrapper
   - `npm i -D @types/chart.js`
   - `npm i quasar @quasar/extras` - Vue component framework
   - `npm i -D @quasar/vite-plugin`
1. Use Quasar configurator tool to help setup Quasar for your specific project:
   - <https://quasar.dev/start/vite-plugin>
1. Setup the following files based on Quasar configurator tool selections:
   - `mains.ts`
   - `vite.config.ts`
1. Additional scripts for `package.json` file. The `deploy` script makes a copy of the `index.html`
   in `dist` as `404.html` to address complications related to routing. This let's you avoid using
   hash based routing.
   ```json
   {
     "scripts": {
       "test": "vitest --environment jsdom --root src/",
       "test:coverage": "vitest --environment jsdom --coverage --root src/",
       "deploy:clean-gh-pages": "gh-pages-clean gh-pages -d dist -m Deployment",
       "deploy:gh-pages": "npm run build && npm version patch && cd dist && cp index.html 404.html && cd .. && gh-pages -d dist -m Deployment"
     }
   }
   ```
1. Setup other config files as desired:
   - `/.vscode/extensions.json` - Include extensions you recommend for your version
   - `tsconfig.app.json` - Setup for ES2020+ support
   - `tsconfig.vitest.json` - Setup for ES2020+ support
   - `.eslintrc.cjs`
   - `.gitignore`
   - `.prettierignore`
   - `.prettier.json`
1. Add icons, manifest file, and update `useMeta` in `~/src/App.vue`
1. Run `git init` inside your project directory
1. Commit all changes to the project into it's initial commit
1. Run the follow commands to push the new project to your GitHub repo:
   ```sh
   git remote add origin https://github.com/GITHUB_USER/PROJECT_NAME.git
   git branch -M main
   git push -u origin main
   ```

## Additional Notes

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) +
[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) +
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI
with `vue-tsc` for type checking. In editors, we need
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a
[Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669)
that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select
      `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Credits

Recognize the work of anyone whose material you used in the project here.

Original `Web App Template` created by Michael Joy (michael-255 on GitHub)
