import { option } from '../option/esbuild.option'

import { build } from 'esbuild'

const _ = (async () => {
    await build(option)
})()