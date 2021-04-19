const fs = require('fs')
const path = require('path')



// callback 方式获取一个文件内容
function getFileContent(fileName, callback) {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        callback(JSON.parse(data.toString()))
    })
}

// 测试
getFileContent('a.json', adata => {
    console.log('adata:', adata)
    getFileContent(adata.next, bdata => {
        console.log('bdata:', bdata)
        getFileContent(bdata.next, cdata => {
            console.log('cdata:', cdata)
        })
    })
})