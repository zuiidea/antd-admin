const fs = require('fs')
const path = require('path')
const beautify = require('js-beautify').js_beautify
const config = require('./package.json')

const dist = path.join(`${__dirname}/dist`)
const maxVersion = 5

const writeVersion = () => new Promise((resolve, reject) => {
  const { version } = config
  const numbers = version.split('.')
  numbers[2] = Number(numbers[2]) + 1
  config.version = numbers.join('.')

  fs.writeFile(path.join(__dirname, 'package.json'), beautify(JSON.stringify(config), { indent_size: 2 }), (err) => {
    if (err) {
      reject()
    }
    resolve()
    console.log(`version: ${config.version}`)
  })
})

const removeFolder = (folderPath) => {
  let files = []
  if (fs.existsSync(folderPath)) {
    files = fs.readdirSync(folderPath)
    files.forEach((file) => {
      const curPath = `${folderPath}/${file}`
      if (fs.statSync(curPath).isDirectory()) {
        removeFolder(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(folderPath)
  }
}

const start = async () => {
  const files = fs.readdirSync(dist)
  const promises = files.map(file => new Promise((resolve, reject) => {
    fs.stat(`${dist}/${file}`, (err, stats) => {
      if (err) {
        reject()
      } else {
        resolve(!stats.isFile()
          ? file
          : null)
      }
    })
  }))

  const result = await Promise.all(promises)

  const folders = result.filter((item) => {
    if (item) {
      return item.split('.').length === 3
    }
    return false
  }).sort((a, b) => {
    const an = a.split('.').map(_ => Number(_))
    const bn = b.split('.').map(_ => Number(_))
    if (an[0] === bn[0]) {
      if (an[1] === bn[1]) {
        return an[2] < bn[2]
      }
      return an[1] < bn[1]
    }
    return an[0] < bn[0]
  }).filter((item, index) => {
    return index > (maxVersion - 1)
  })

  for (const item of folders) {
    await removeFolder(`${dist}/${item}`)
  }

  await writeVersion()
}

start()
