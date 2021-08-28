const getAllVideos = 'SELECT * FROM videos';

const getVideoById = 'SELECT * FROM videos WHERE id = $1';

const AddVideo = 'INSERT INTO videos (id, title, vidurl, rating) VALUES ($1, $2, $3, $4)';

const deleteVideo = 'DELETE FROM videos WHERE id = $1';

const incrementVotes = 'UPDATE videos SET rating = $1 + 1 WHERE id = $2';

const decrementVotes = 'UPDATE videos SET rating = $1 - 1 WHERE id = $2';

module.exports = {
    getAllVideos,
    getVideoById,
    AddVideo,
    deleteVideo,
    incrementVotes,
    decrementVotes,
};