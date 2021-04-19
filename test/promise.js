const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')
const path = require('path')



// promise 方式获取一个文件内容
function getFileContent(fileName) {
    const promise = new Promise((resolve, rejects) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName)
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                rejects(err)
                return
            }
            resolve(JSON.parse(data.toString()))
        })
    })
    return promise
}

// 测试
getFileContent('a.json')
    .then(adata => {
        console.log('adata:', adata)
        return getFileContent(adata.next)
    })
    .then(bdata => {
        console.log('bdata:', bdata)
        return getFileContent(bdata.next)
    })
    .then(cdata => {
        console.log('cdata:', cdata)
    })

//async await