import { BuildOptions } from 'esbuild'

const option: BuildOptions = {
    entryPoints: [
        './source/assignment_sdk/index.ts',
    ],
    outdir: 'build',

    platform: 'browser',
    target: 'es2015',

    minify: true,
    bundle: true,

    logLevel: 'info',
}

export { option }