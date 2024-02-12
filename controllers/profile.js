const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({
      id: id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        req.json.status(400).json("I can't find that user");
      }
    })
    .catch((err) => res.status(400).json("Error getting users"));
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
