const getList = (author, keyword) => {
    return [{
            id: 1,
            title: '标题1',
            content: '内容1',
            createTime: 1546610491112,
            author: 'zhangsan'
        },
        {
            id: 2,
            title: '标题2',
            content: '内容2',
            createTime: 1546610491999,
            author: 'lisi'
        },
        {
            id: 3,
            title: '标题3',
            content: '内容3',
            createTime: 1546630493332,
            author: 'wanger'
        },
        {
            id: 4,
            title: '标题4',
            content: '内容4',
            createTime: 1546640494442,
            author: 'mazi'
        },
        {
            id: 5,
            title: '标题5',
            content: '内容5',
            createTime: 15466504952,
            author: 'xingyuner'
        },
    ]
}

const getDetail = (id) => {
    return {
        id: 2,
        title: '标题2',
        content: '内容2',
        createTime: 1546610491999,
        author: 'lisi'
    }
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content 属性
    return {
        id: 3,

    }
}

const updateBlog = (id, blogData = {}) => {
    // id： 要更新博客的 ID
    // blogData 是一个博客对象，包含 title content 属性
    return true
}

const delBlog = (id) => {
    // id： 要删除博客的 ID
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}