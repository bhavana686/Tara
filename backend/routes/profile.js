var express = require("express");
var router = express.Router();
const pool = require("../dbConfig");
const query = require("../helpers/query");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, "./public/files");
    } else {
      cb(null, "./public/profilepic");
    }
  },
  filename: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, file.originalname + path.extname(file.originalname));
    } else {
      cb(null, file.originalname + path.extname(file.originalname));
    }
  },
});
const upload = multer({
  storage,
});

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "AKIAYSOIUCGNKQ6XIPLL",
  secretAccessKey: "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",
});
console.log(s3);

router.post("/admin/:id", async (req, res) => {
  try {
    console.log("admin edit");
    var dbquery =
      "UPDATE admin SET name = ?, email = ?, phone_number = ? WHERE (uid = ?)";
    result = await query(pool, dbquery, [
      req.body.name,
      req.body.email,
      req.body.phone_number,
      req.params.id,
    ]).catch(console.log);
    console.log(result);
    res.status(200).send(result);
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.get("/admin/:id", async (req, res) => {
  try {
    var dbquery = "select * from admin where uid=?";
    result = await query(pool, dbquery, [req.params.id]).catch(console.log);
    console.log(result);
    res.status(200).send(result);
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.post("/user/:id", async (req, res) => {
  try {
    console.log("update user");
    var dbquery =
      "UPDATE users SET name = ?, email = ?, phone_number = ? WHERE (uid = ?)";
    result = await query(pool, dbquery, [
      req.body.name,
      req.body.email,
      req.body.phone_number,
      req.params.id,
    ]).catch(console.log);
    console.log(result);
    res.status(200).send(result);
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    var dbquery = "select * from users where uid=?";
    result = await query(pool, dbquery, [req.params.id]).catch(console.log);
    res.status(200).send(result);
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.post(
  "/uploadpic/admin/:id",
  upload.single("profilepic"),
  async (request, response) => {
    try {
      console.log(request.body);
      console.log("admin pic");
      console.log(process.env);
      if (request.file) {
        const fileContent = fs.readFileSync(
          `./public/profilepic/${request.file.originalname}${path.extname(
            request.file.originalname
          )}`
        );

        const params = {
          Bucket: softwareengineeringbucket,

          Key: `${request.file.originalname}${path.extname(
            request.file.originalname
          )}`,
          Body: fileContent,
          ContentType: request.file.mimetype,
        };
        console.log("--------");
        console.log(params);
        s3.upload(params, async (err, data) => {
          if (err) {
            console.log(err);
            return response.status(500).json({ error: err.message });
          }

          const dbquery = "update admin set profile_pic=? where  uid=?";
          result = await query(pool, dbquery, [
            data.Location,
            request.params.id,
          ]).catch(console.log);
          response.status(200).send(result);
        });
      }
    } catch (ex) {
      const message = ex.message ? ex.message : "Error while uploading resume";
      const code = ex.statusCode ? ex.statusCode : 500;
      return response.status(code).json({ message });
    }
  }
);

router.post(
  "/uploadpic/user/:id",
  upload.single("profilepic"),
  async (request, response) => {
    try {
      console.log(request.body);
      if (request.file) {
        const fileContent = fs.readFileSync(
          `./public/profilepic/${request.file.originalname}${path.extname(
            request.file.originalname
          )}`
        );
        const params = {
          Bucket: softwareengineeringbucket,
          Key: `${request.file.originalname}${path.extname(
            request.file.originalname
          )}`,
          Body: fileContent,
          ContentType: request.file.mimetype,
        };
        console.log("--------");
        console.log(params);
        s3.upload(params, async (err, data) => {
          if (err) {
            console.log(err);
            return response.status(500).json({ error: err.message });
          }

          const dbquery = "update users set profile_pic=? where  uid=?";
          result = await query(pool, dbquery, [
            data.Location,
            request.params.id,
          ]).catch(console.log);
          console.log(result);

          response.status(200).send(result);
        });
      }
    } catch (ex) {
      const message = ex.message ? ex.message : "Error while uploading resume";
      const code = ex.statusCode ? ex.statusCode : 500;
      return response.status(code).json({ message });
    }
  }
);
module.exports = router;
