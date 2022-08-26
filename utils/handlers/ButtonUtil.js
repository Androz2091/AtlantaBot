const { promisify } = require('util')
const { glob } = require('glob')
const pGlob = promisify(glob)

module.exports = async client => {
    (await pGlob(`${process.cwd()}/buttons/*/*.js`)).map(async buttonFile => {
        const button = require(buttonFile)

        await client.buttons.set(button.name, button)
    })
}