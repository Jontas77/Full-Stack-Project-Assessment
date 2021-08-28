const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getAllVideos);
router.get("/:id", controller.getVideoById);
router.post("/", controller.AddVideo);
router.delete("/:id", controller.deleteVideo);
router.put("/incr/:id", controller.incrementVotes);
router.put("/decr/:id", controller.decrementVotes);


module.exports = router;
