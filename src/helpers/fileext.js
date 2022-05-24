const path = require('path');

module.exports = (file, cb, type = 'std') => {
    let allowed = std()

    let fileExt = path.extname(file.originalname)

    let ext = allowed.test(fileExt.toLocaleLowerCase())
    let mimetype = allowed.test(file.mimetype)

    if (!mimetype || !ext) {
        const err = new Error(`${fileExt} is not allowed`);
        err.code = 'FILE_TYPE_NOT_ALLOWED';

        return cb(err)
    }

    cb(null, true);
}

const std = () => /jpeg|jpg|png|pdf|doc|docx|zip|zar|7z|mp4|mkv|mp3|m4p|txt/