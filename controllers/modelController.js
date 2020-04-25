const validator = require("express-validator");
const async = require("async");

const Startup = require("../models/model");

exports.get_startup_list = async (req, res, next) => {
  await Startup.find({}).exec((err, result) => {
    if (err) {
      return next(err);
    }
    if (result.length > 0) {
      res.json({ found: "success", details: result });
    } else {
      res.json({ found: "unsuccessful" });
    }
  });
};

exports.save_startup = [
  validator
    .body("name")
    .isLength({ min: 1 })
    .withMessage("name cannot be empty")
    .escape()
    .trim(),
  validator
    .body("country")
    .isLength({ min: 1 })
    .withMessage("name cannot be empty")
    .escape()
    .trim(),

  async (req, res, next) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ found: "unsuccessful", errors: errors.array() });
    } else {
      await Startup.estimatedDocumentCount().exec(async (err, c) => {
        if (err) {
          return next(err);
        }
        count = c + 1;
        const startup = new Startup({
          id: count,
          name: req.body.name,
          country: req.body.country,
        });

        await startup.save((err) => {
          if (err) {
            return next(err);
          }
          res.json({ saved: "success" });
        });
      });
    }
  },
];
