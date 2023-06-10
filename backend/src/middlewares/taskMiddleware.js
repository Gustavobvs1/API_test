function validateTitle(req, res, next) {
  const { body } = req;

  if (body.title === undefined) {
    return res.status(400).json({ message: "O campo titulo é obrigatório" });
  } else if (body.title === "") {
    return res
      .status(400)
      .json({ message: "O campo titulo não pode estar vazio" });
  }

  next();
}

function validateStatus(req, res, next) {
  const { body } = req;

  if (body.status === undefined) {
    return res.status(400).json({ message: "O campo status é obrigatório" });
  } else if (body.status === "") {
    return res
      .status(400)
      .json({ message: "O campo status não pode estar vazio" });
  }

  next();
}

module.exports = {
  validateTitle,
  validateStatus,
};
