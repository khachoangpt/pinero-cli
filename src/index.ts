#!/usr/bin/env node

import { createCommand } from './commands/create'

const bootstrap = async () => {
  createCommand()
}

bootstrap()
