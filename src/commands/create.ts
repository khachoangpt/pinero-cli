/* eslint-disable @typescript-eslint/no-unused-expressions */
import { execSync } from 'node:child_process'

import inquirer from 'inquirer'
import yargs from 'yargs'

export const createCommand = async () => {
  yargs.command({
    command: 'create',
    describe: 'Create a new Next.js project',
    handler: async () => {
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
        `cd ${projectName} && rm -rf .git pnpm-lock.yaml && npm pkg set name="${projectName}" && ${projectManager} install`,
      )
    },
  }).argv
}

const askForProjectName = async () => {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: "What's the name of your project?",
      default: 'next-base',
      filter: (input) => {
        return input.toLowerCase()
      },
      validate: (input) => {
        if (!input.length) {
          return 'Please enter a project name'
        }
        return true
      },
    },
  ])
  return projectName
}

const askForI18n = async () => {
  const { i18n } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'i18n',
      message: 'Do you want to use i18n?',
      default: false,
    },
  ])
  return i18n
}

const askForProjectManager = async () => {
  const { projectManager } = await inquirer.prompt([
    {
      type: 'select',
      name: 'projectManager',
      message: 'Which project manager do you want to use?',
      choices: ['npm', 'yarn', 'pnpm'],
      default: 'pnpm',
    },
  ])
  return projectManager
}
