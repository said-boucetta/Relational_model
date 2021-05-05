const Question = require("../../../models/question");

const getQuestions = async (req, res) => {
  try {
    const { texte, sort } = req.query;
    const filters = {};
    const options = {};

    if (texte) filters.texte = { $regex: texte, $options: "i" };
    if (sort) {
      options.sort = { createdAt: Number(sort) };
    }
    const questions = await Question.find(
      filters,
      "-reponse -_id -__v",
      options
    );
    if (!questions) {
      return res.status(500).send({
        message: "Questions not found",
      });
    }
    return res.status(200).send(questions);
  } catch (error) {
    console.log("Error getQuestions =>", error);
    return res.status(500).send({
      message: "Server Error",
    });
  }
};
const getOneQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question) {
      return res.status(400).send({
        message: "question not found",
      });
    }
    return res.status(200).send(question);
  } catch (error) {
    console.log("Error getOneQuestion =>", error);
    return res.status(500).send({
      message: "Server Error",
    });
  }
};
const addQuestion = async (req, res) => {
  const { texte, choix, reponse } = req.body;
  try {
    const question = new Question({
      texte,
      choix,
      reponse,
    });
    await question.save();
    return res.status(201).send(question);
  } catch (error) {
    console.log("Error addQuestion =>", error);
    return res.status(500).send({
      message: "Server Error",
    });
  }
};
const updateQuestion = async (req, res) => {
  const { texte, choix, reponse } = req.body;
  const { id } = req.params;
  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(400).send({
        message: "question not found",
      });
    }
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      {
        texte,
        choix,
        reponse,
      },
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(400).send({
        message: "question not updated",
      });
    }
    return res.status(200).send(updatedQuestion);
  } catch (error) {
    console.log("Error updateQuestion =>", error);
    return res.status(500).send({
      message: "Server Error",
    });
  }
};
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(400).send({
        message: "question doesn't exists",
      });
    }
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(500).send({
        message: "question not deleted",
      });
    }
    return res.status(200).send(deletedQuestion);
  } catch (error) {
    console.log("Error deleteQuestion =>", error);
    return res.status(500).send({
      message: "Server Error",
    });
  }
};

module.exports = {
  getOneQuestion,
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
};
