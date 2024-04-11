const fileObj = require('../../modules/file-api-test/index');
module.exports = [
    {
        path: '/post-breakpoint-continuation-file',
        method: 'post',
        handler: fileObj.fileApi,
    },
    {
        path: '/merge-file',
        method: 'post',
        handler: fileObj.mergeApi,
    },
]