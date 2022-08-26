const { promisify } = require('util')
const { glob } = require('glob')
const pGlob = promisify(glob)

module.exports = async client => {
    (await pGlob(`${process.cwd()}/selects/*/*.js`)).map(async selectMenuFile => {
        const selectMenu = require(selectMenuFile)

        await client.selects.set(selectMenu.name, selectMenu)
    })
}