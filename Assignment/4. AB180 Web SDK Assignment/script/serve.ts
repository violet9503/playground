import { option } from '../option/esbuild.option'

import { build } from 'esbuild'

import http from 'http'
import { exec } from 'child_process'
import handler from 'serve-handler'

const port = parseInt(process.env.PORT) || 3000

const _ = (() => {
    build({
        ...option,

        watch: true,
    })

    const server =http.createServer((request, response) => {
        return handler(request, response, {
            rewrites: [
                { source: '**', destination: '/test-web/index.html' }
            ],
        })
    })

    server.listen(port, () => {
        const url = `http://localhost:${port}`

        console.log(`Run on ${url}`)
        openURL(url)
    })
})()

const openURL = (url: string) => {
    if (process.platform === 'win32') {
        exec(`start ${url}`)
        return
    }

    exec(`open ${url}`)
}