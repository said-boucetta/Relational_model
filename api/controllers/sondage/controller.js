const Sondage = require("../../../models/sondage");

const getSondages = async (req, res) => {
  const { sujet, sort } = req.query;
  try {
    const filters = {};
    const options = {};
    if (sujet) filters.sujet = { $regex: sujet, $options: "i" };
    if (sort) options.sort = { createdAt: Number(sort) };
    const sondages = await Sondage.find(filters, {}, options).populate(
      "questions",
      "texte choix -_id"
    );
    if (!sondages) {
      return res.status(500).send({
        message: "Sondage not found",
      });
    }
    return res.status(200).send(sondages);
  } catch (error) {
    console.log("Error in getSondages =>", error);
    return res.status(500).send({
      message: "Server Error",
    });
  }
};
const getOneSondage = async (req, res) => {
  try {
    const { id } = req.params;
    const sondage = await Sondage.findById(id).populate(
      "questions",
      "texte choix -_id"
    );
    //
    if (!sondage) {
      return res.status(400).send({
        message: "Sondage doesn't exist",
      });
    }
    return res.status(200).send(sondage);
  } catch (error) {
    console.log("Error in getOneSondage =>", error);
    return res.status(500).send({
      message: "Server Error",
    });
  }
};
const addSondage = async (req, res) => {
  try {
    const { sujet, questions } = req.body;
    const sondage = new Sondage({
      sujet,
      questions,
    });
    await sondage.save();
    return res.status(201).send(sondage);
  } catch (error) {
    console.log("Error in addSondage => ", error);
    return res.status(500).send({
      message: "Server error",
    });
  }
};
const updateSondage = async (req, res) => {
  try {
    const { sujet, questions } = req.body;
    const { id } = req.params;
    const sondage = await Sondage.findById(id);
    if (!sondage) {
      return res.status(400).send({
        message: "Sondage doesn't exist",
      });
    }
    const updatedSondage = await Sondage.findByIdAndUpdate(
      id,
      {
        sujet,
        questions,
      },
      { new: true }
    );
    if (!updatedSondage) {
      return res.status(500).send({
        message: "Sondage not updated",
      });
    }
    return res.status(200).send(updatedSondage);
  } catch (error) {
    console.log("Error in updateSondage => ", error);
    return res.status(500).send({
      message: "Server error",
    });
  }
};
const deleteSondage = async (req, res) => {
  try {
    const { id } = req.params;
    const sondage = await Sondage.findById(id);
    if (!sondage) {
      return res.status(400).send({
        message: "Sondage doesn't exist",
      });
    }
    const deletedSondage = await Sondage.findByIdAndDelete(id);
    if (!deletedSondage) {
      return res.status(500).send({
        message: "Sondage not deleted",
      });
    }
    return res.status(200).send(deletedSondage);
  } catch (error) {
    console.log("Error in deleteSondage => ", error);
    return res.status(500).send({
      message: "Server error",
    });
  }
};

module.exports = {
  getOneSondage,
  getSondages,
  addSondage,
  updateSondage,
  deleteSondage,
};
