const recordService = require("../services/recordService");

const getRecord = async (req, res) => {
  try {
    const record = await recordService.getRecords();
    res.json(record);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateRecord = async (req, res) => {
  try {
    const data = req.body;
    const result = await recordService.updateRecord(data);
    res.json({success: true, data: result});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getRecord,
  updateRecord,
};
