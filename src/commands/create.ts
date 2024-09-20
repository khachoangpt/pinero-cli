/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { execSync } from 'node:child_process'
import fs from 'node:fs'

import spawn from 'cross-spawn'
import inquirer from 'inquirer'
import yargs from 'yargs'

export const createCommand = async () => {
  const createCommand = yargs.command({
    command: 'create',
    describe: 'Create a new Next.js project',
    handler: handleCreateCommand,
  })

  return createCommand.argv
}

const handleCreateCommand = async () => {
  const projectManager = await askForProjectManager()
  const projectName = await askForProjectName()
  const i18n = await askForI18n()

  if (i18n) {
    execSync(
      `git clone https://github.com/khachoangpt/next-codebase-i18n ${projectName}`,
    )
  } else {
    execSync(
      `git clone https://github.com/khachoangpt/next-codebase ${projectName}`,
    )
  }

  execSync(
    `cd ${projectName} && rm -rf .git pnpm-lock.yaml && npm pkg set name="${projectName}"`,
  )

  await spawn(projectManager, ['install'], {
    cwd: `./${projectName}`,
    stdio: 'inherit',
  })
}

const askForProjectName = async () => {
  const chalk = (await import('chalk')).default
  const promptResult = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'projectName',
        message: "What's the name of your project?",
        default: 'next-base',
        filter: (input) => {
          return input.toLowerCase()
        },
        validate: (input) => {
          if (!input.trim().length) {
            return 'Please enter a project name'
          }
          return true
        },
      },
    ])
    .catch(() => {
      process.exit(1)
    })

  if (fs.existsSync(promptResult?.projectName)) {
    console.log(
      chalk.red(`Project ${promptResult?.projectName} already exists`),
    )
    await askForProjectName()
  } else {
    return promptResult?.projectName
  }
}

const askForI18n = async () => {
  const { i18n } = await inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'i18n',
        message: 'Do you want to use i18n?',
        default: false,
      },
    ])
    .catch(() => {
      process.exit(1)
    })
  return i18n
}

const askForProjectManager = async () => {
  const { projectManager } = await inquirer
    .prompt([
      {
        type: 'select',
        name: 'projectManager',
        message: 'Which project manager do you want to use?',
        choices: ['npm', 'yarn', 'pnpm'],
        default: 'pnpm',
      },
    ])
    .catch(() => {
      process.exit(1)
    })
  return projectManager
}
