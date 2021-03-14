var express = require("express");
const router = express.Router();
var db = require("../models");

// ======================GET======================

// getting Tournaments for the home page
// router.get("/api/",(req,res)=>{
//     db.Users.findOne({
//       where:{id:req.params.id},
//       include: [db.Tournaments,{
//         model: db.Users,
//         as: 'Friends'
//       }]
//     }).then((results)=>{
//       console.log(results);
//       res.json(results);
//     })
// })

// Create New User
router.post("/api/song", (req, res) => {
    db.Songs.create(
        {song:req.body.song,
        artist: req.body.artist}
    ).then((song) => {
        res.json(
            {song:req.body.song,
            artist: req.body.artist}
            )
 
    }).catch(function(){
        console.log("not posted")
    })
  })


module.exports = router