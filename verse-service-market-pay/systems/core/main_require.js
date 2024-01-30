
const globalService = require('./../../utils/globalService'); 

const prfileModel = require('./../../schema/model_profile'); 
const roomModel = require('./../../schema/model_room');
const mainRequire = {
	models : {
    prfileModel,
    roomModel
  },
  globalService
}
module.exports = mainRequire  