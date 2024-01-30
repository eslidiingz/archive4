const fetch = require('node-fetch')
const { URLSearchParams } = require('url')



exports.uploadsFiles = async(req, res) => {
    if (req.files && req.files.length) {
        let images = []
        let videos = []
        let videosCover = []
        let audio = []
        for (let file of req.files) {
            // console.log(req.files)
            const { fieldname, filename, path } = file

            if (file.size < 50000000) {

                // await fetch(`http://staticcontent.mhelpme.com/web/upload_node_aws.php?image_path=${filename}&path=chat`)
                if (fieldname === 'image_url[]') {
                    images.push(filename)
                } else if (fieldname === 'video_url[]') {
                    videos.push(filename)
                } else if (fieldname === 'video_cover_url[]') {
                    videosCover.push(filename)
                } else if (fieldname === 'audio_url[]') {
                    audio.push(filename)
                }
                error = 0
                msg = 'Ok'

            } else {
                console.log("Size file over.")
                error = 1
                msg = 'Size file over.'
            }

            // fs.unlink(path, (err) => {
            //   if (err) console.log(err)
            // }) 

        }

        let response = {
            images: images,
            videos: videos,
            videosCover: videosCover,
            audio: audio
        }
        res.status(200).json({
            error: error,
            msg: msg,
            result: response,
        })


    } else {
        res.status(200).json({
            error: '1',
            msg: 'Not found files',
            result: {},
        })
    }

}