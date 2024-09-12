import fs from 'fs'

const FILTER = /^(?!(index\.)).*\.d\.ts$/

const files = fs.readdirSync('.').filter(f =>  FILTER.test(f))
  .map(f => `/// <reference path="${f}" />`)
  .join('\n')
fs.writeFileSync('index.d.ts', `${files}\n`)
