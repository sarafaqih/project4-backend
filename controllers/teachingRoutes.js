
const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const router = express.Router();
const Teaching = require("../models/TeachingApplication.js");
const Class = require("../models/Class.js")




//Teaching Routes Section ----------------------------------------------------------------------

router.post("/", verifyToken, async (req, res) => {
    try {
      console.log(req.body)
      req.body.volunteer = req.user._id
      const teachApp = await Teaching.create(req.body)
      teachApp._doc.volunteer = req.user
      res.status(201).json(teachApp)
    } catch (err) {
      console.log(err)
      res.status(500).json({ err: err.message })
    }
  })




  // router.get("/", verifyToken,async (req, res) => {
  //   try {
  //     const teachApps = await Teaching.find({})
  //       .populate("volunteer")
  //       .sort({ createdAt: "desc" });
  //     res.status(200).json(teachApps);
  //   } catch (err) {
  //     res.status(500).json({ err: err.message });
  //   }
  // });


  router.get("/", verifyToken, async (req, res) => {
    try {
      
      let query = {};
      // If the user is a volunteer, filter by their ID
      if (req.user.role === "volunteer") {
        query.volunteer = req.user._id;
      }
      // Retrieve the teaching applications, populated with the volunteer details
      const teachApps = await Teaching.find(query)
        .populate("volunteer")
        .sort({ createdAt: "desc" });
  
      res.status(200).json(teachApps);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  


// put static routes before dynamic ones (get for class) ------
  router.get("/classes", verifyToken, async (req, res) => {
    try {
      const classes = await Class.find({})
      .populate({
        path: "teachingApplication",
        populate: [
          { path: "volunteer", model: "User" },
          { path: "apprRejBy", model: "User" }
        ]
      })
        .sort({ createdAt: "desc" });
      res.status(200).json(classes);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  router.get("/:teachId", verifyToken, async (req, res) => {
    try {
      const teachApp = await Teaching.findById(req.params.teachId).populate("volunteer");
      res.status(200).json(teachApp);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });


  router.put("/:teachId", verifyToken, async (req, res) => {
    try {


        if (req.user.role === "admin") {
            if (req.body.approvement === "Approved" || req.body.approvement === "Rejected")
            // console.log(req.body.approvement)
                
                req.body.approvedBy = req.user._id
          }


  
      const updatedteachApp = await Teaching.findByIdAndUpdate(
        req.params.teachId,
        req.body,
        { new: true }
      ).populate("volunteer");
  
    //   updatedteachApp._doc.volunteer = req.user;
  
      res.status(200).json(updatedteachApp);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });




  router.delete("/:teachId", verifyToken, async (req, res) => {
    try {
     
  
      const deletedteachApp = await Teaching.findByIdAndDelete(req.params.teachId);
      res.status(200).json(deletedteachApp);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });


//Class Routes Section ----------------------------------------------------------------------

router.post("/:teachId/class", verifyToken, async (req, res) => {

    try {
        req.body.teachingApplication = req.params.teachId
        console.log(req.body.teachingApplication)


        const oneClass = await Class.create(req.body);
        
      const teachApp = await Teaching.findById(req.params.teachId).populate("volunteer");
        oneClass._doc.teachingApplication = teachApp;

        res.status(201).json(oneClass);
      } catch (err) {
        res.status(500).json({ err: err.message });
      }
    })






    router.get("/classes/:classId", verifyToken, async (req, res) => {
        try {
          const oneClass = await Class.findById(req.params.classId)
          .populate({
            path: "teachingApplication",
            populate: [
              { path: "volunteer", model: "User" },
              { path: "apprRejBy", model: "User" }
            ]
          })
          res.status(200).json(oneClass);
        } catch (err) {
          res.status(500).json({ err: err.message });
        }
      });
      

      router.put("/classes/:classId", verifyToken, async (req, res) => {
        try {

          const updatedClass = await Class.findByIdAndUpdate(
            req.params.classId,
            req.body,
            { new: true }
          );
      
          res.status(200).json(updatedClass);
        } catch (err) {
          res.status(500).json({ err: err.message });
        }
      });


      router.delete("/classes/:classId", verifyToken, async (req, res) => {
        try {

    
          if (req.user.role !== "admin" ) {
            return res.status(403).send("You're not allowed to do that!");
          }
    
      
          const deletedClass = await Class.findByIdAndDelete(req.params.classId);
          res.status(200).json(deletedClass);
        } catch (err) {
          res.status(500).json({ err: err.message });
        }
      });
    
module.exports = router;
