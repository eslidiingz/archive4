const express = require('express')
const route = express.Router()
const controller = require('./controller') 
const multer = require('multer')

let storage = multer.diskStorage({
  
  destination: function (req, file, cb) { 
    cb(null, `${__dirname}/../../../uploads/chat`)
  },
  
  filename: function (req, file, cb) { 
    // console.log("File",file)
    // console.log(`${__dirname}/uploads/chat`)
    console.log("File",req) 
    console.log("File req",req)
    const extension = file.originalname.split('.')
    const randDigits = Math.floor(1000 + Math.random() * 9000)
    const formatName = `${Date.now()}_${randDigits}.${extension[extension.length - 1]}`
    if (file.fieldname === 'image_url[]') {
      cb(null, `img_${formatName}`)
    } else if (file.fieldname === 'video_url[]') {
      cb(null, `video_${formatName}`)
    } else if (file.fieldname === 'video_cover_url[]') {
      cb(null, `video_cover_${formatName}`)
    } else if (file.fieldname === 'audio_url[]') {
      cb(null, `audio_${formatName}`)
    }
  }
})

const upload = multer({ storage: storage }) 
route.post('/uploads_files', upload.any(), controller.uploadsFiles)  

module.exports = route  