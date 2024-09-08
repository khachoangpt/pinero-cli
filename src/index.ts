#!/usr/bin/env node

import yargs from 'yargs';
import inquirer from 'inquirer';
import { execSync } from 'node:child_process';

const bootstrap = async () => {
  yargs
  yargs.command({
    command: 'create',
    describe: 'Create a new Next.js project',
    handler: async () => {
      const projectName = await askForProjectName()
      execSync(`git clone https://github.com/khachoangpt/next-codebase ${projectName}`)
    }
  }).help().argv
};

const askForProjectName = async () => {
  const {projectName} = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: "What's the name of your project?",
      default: 'pinero-ui',
      filter: (input) => {
        return input.toLowerCase()
      },
      validate: (input) => {
        if (!input.length) {
          return "Please enter a project name"
        }
        return true
      },
    }
  ])
  return projectName
}

bootstrap();