const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("",(req,res,next)=>{
  console.log("여기오나")
  return res.json('aa')
})


module.exports = router;