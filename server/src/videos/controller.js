const pool = require("../../db");
const ID = require("nodejs-unique-numeric-id-generator");
const url = require("url");
const queries = require("./queries");

const getAllVideos = (req, res) => {
    pool.query(queries.getAllVideos, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows)
    })
};

const getVideoById = (req, res) => {
    const { id } = req.params;
    pool.query(queries.getVideoById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows)
    })
};

const AddVideo = async (req, res) => {
  try {
  const newVideo = {
    id: ID.generate(new Date().toJSON()),
    ...req.body,
  };

  const { id, title, vidurl, rating } = newVideo;
  console.log(vidurl)
    const myURL = new URL(vidurl);
    if (!title || title === "" || !vidurl || vidurl === "") {
      return res.status(400).json({
        result: "failure",
        message: "Video could not be saved",
      });
    }
    await pool.query(queries.AddVideo, [id, title, vidurl, rating]);
    res.json({ id: `${id}`})
  } catch (error) {
    console.log(`${Date().toString()}: ${error.input} is not a valid url`);
    return res.status(400).send(`${error.input} is not a valid url`);
  }

};

const deleteVideo = (req, res) => {
    const { id } = req.params;
    pool.query(queries.deleteVideo, [id], (error, results) => {
        if(error) {
          res.json({
            result: "failure",
            message: "Video could not be deleted"
          });
        } else {
        res.send({})
        }
    })
};

const incrementVotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const result = await pool.query(queries.incrementVotes, [rating, id]);
    res.send('Votes Updated!')
  } catch (error) {
    console.error(error.message)
  }
};

const decrementVotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const result = await pool.query(queries.decrementVotes, [rating, id]);
    res.send('Votes Updated!')
  } catch (error) {
    console.error(error.message)
  }
};

module.exports = {
    getAllVideos,
    getVideoById,
    AddVideo,
    deleteVideo,
    incrementVotes,
    decrementVotes,
};
