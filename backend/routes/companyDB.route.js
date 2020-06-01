var express = require("express");
var router = express.Router();
const pool = require("../dbConfig");
var admin = require("firebase-admin");
const query = require("../helpers/query");

router.get("/alllocations", async (request, response) => {
  try {
    const dbquery = "select * from location ";

    await pool.query(dbquery, (err, result) => {
      if (err) throw new Error(err);
      console.log(result);
      response.status(200).send(result);
    });
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.get("/allprojects", async (request, response) => {
  try {
    const dbquery = "select * from projects ";

    await pool.query(dbquery, (err, result) => {
      if (err) throw new Error(err);
      console.log(result);
      response.status(200).send(result);
    });
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.get("/allactors", async (request, response) => {
  try {
    const dbquery = "select * from cast";

    await pool.query(dbquery, (err, result) => {
      if (err) throw new Error(err);
      console.log(result);
      response.status(200).send(result);
    });
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.get("/allcostumes", async (request, response) => {
  try {
    const dbquery = "select * from costume ";

    await pool.query(dbquery, (err, result) => {
      if (err) throw new Error(err);
      console.log(result);
      response.status(200).send(result);
    });
  } catch (ex) {
    return response.status(500).send(err);
  }
});
router.get("/allevents", async (request, response) => {
  try {
    const dbquery = "select * from Events ";

    await pool.query(dbquery, (err, result) => {
      if (err) throw new Error(err);
      // console.log(result);
      response.status(200).send(result);
    });
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.get("/all-users-from-company/:id", async (req, res) => {
  console.log(req.params);
  const constructedQuery = `select * from users where company_id = ? `;
  result = await query(pool, constructedQuery, req.params.id).catch(
    console.log
  );
  console.log(result);
  res.status(200).send(result);
});

router.get("/allroles", async (request, response) => {
  try {
    const dbquery = "select * from userroles ";
    console.log("inside get all users");
    await pool.query(dbquery, (err, result) => {
      if (err) throw new Error(err);
      console.log(err);
      response.status(200).send(result);
    });
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.post("/assigntoproject", async (request, response) => {
  try {
    var err;
    console.log("in assign project");
    console.log(request.body);
    const users = request.body.usernames;
    const projectid = request.body.project_id;
    console.log("users", users);
    console.log("projectid", projectid);

    for (var i = 0; i < users.length; i++) {
      var dbquery =
        "select * from project_users where project_Id = ? and user_Id = ?";
      result = await query(pool, dbquery, [projectid, users[i]]).catch(
        console.log
      );
      console.log("users", result);

      if (!result.length > 0) {
        var dbquery =
          "INSERT INTO `project_users`(`project_Id`, `user_Id`) VALUES (?,?)";
        var values = [projectid, users[i]];
        console.log(values);
        await pool.query(dbquery, values, (err, result) => {
          if (err) throw new Error(err);
          // console.log(result);
          // response.status(200).send(result);
        });
      }
    }

    response.status(200).send("added to project successfully");
  } catch (ex) {
    return response.status(500).send(err);
  }
});

router.post("/addrolestouser", async (request, response) => {
  var roles = null;
  var count = 0;
  try {
    console.log("body in addroles", request.body);
    var dbquery =
      "select roles from users where userid =" + request.body.user_id;
    // const dbquery = "insert into * from userroles ";
    var length = request.body.roles.length;
    console.log("number of roles assogned", length);

    // console.log("inside get all users");
    await pool.query(dbquery, (err, result) => {
      if (err) throw new Error(err);
      console.log(result);
      roles = result;
      // response.status(200).send(result);
      console.log("the roles are", result);
    });
    var updatequery = null;
    var values = null;
    console.log("the number of roles he has ", roles);
    count = length - roles;
    if (count === 4) {
      updatequery =
        "update  users set roles = ?, role1=? , role2 = ?,role3 = ?,role4 = ? where `userid` = ?";
      values = [
        count + roles,
        request.body.roles[0].rolename,
        request.body.roles[1].rolename,
        request.body.roles[2].rolename,
        request.body.roles[3].rolename,
        request.body.user_id,
      ];
    } else if (count === 3) {
      updatequery =
        "update  users set roles = ?, role1=? , role2 = ?,role3 = ? where `userid` = ?";
      values = [
        count + roles,
        request.body.roles[0].rolename,
        request.body.roles[1].rolename,
        request.body.roles[2].rolename,
        request.body.user_id,
      ];
    } else if (count === 2) {
      updatequery =
        "update  users set roles = ?, role1=? , role2 = ? where `userid` = ?";
      values = [
        count + roles,
        request.body.roles[0].rolename,
        request.body.roles[1].rolename,
        request.body.user_id,
      ];
    } else if (count === 1) {
      updatequery = "update  users set roles = ?, role1=?  where `userid` = ?";
      values = [
        count + roles,
        request.body.roles[0].rolename,
        request.body.user_id,
      ];
    } else {
      console.log("all 4 roles set");
    }
    await pool.query(updatequery, values, (err, result) => {
      if (err) throw new Error(err);
      console.log(result);
      roles = result;
      response.status(200).send(result);
      console.log("the roles are", result);
    });
  } catch (ex) {
    console.log(ex);

    return response.status(500).send(ex);
  }
});

router.get("/getcrewlist", async function (req, res) {
  console.log("Inside  getcrewlist ");

  // const getcast = 'SELECT users.*, crew.* FROM users INNER JOIN crew ON crew.fk_userid=users.userid';
  const getcast =
    "SELECT users.*, crew.* FROM users INNER JOIN crew ON crew.fk_userid=users.userid";
  pool.query(getcast, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ responseMessage: "Error Occurred" });
    } else if (result.length > 0) {
      console.log(result);
      res.status(200).send(result);
    } else {
      console.log("crew does not exist");
      res.status(400).send("crew does not exist");
    }
  });
});

router.post("/submitnewcostume", async function (req, res) {
  console.log("Inside add new costume");
  console.log(req.body);
  const sqlquery =
    "insert into costume(costumename,source,description) values(?,?,?)";
  result = await query(pool, sqlquery, [
    req.body.name,
    req.body.source,
    req.body.description,
  ]).catch(console.log);
  console.log(result);
  res.status(201).send(result);
});

router.post("/deletecostume", async function (req, res) {
  console.log("Inside add new costume");
  console.log(req.body);

  var sqlquery = "delete from costume where costumeid = ?";
  result = await query(pool, sqlquery, [req.body.costumeid]).catch(console.log);
  console.log(result);

  var sqlquery = "delete from project_costumes where costumeid = ?";
  result = await query(pool, sqlquery, [req.body.costumeid]).catch(console.log);
  console.log(result);
  res.status(201).send(result);
});

router.post("/submitnewcostumebyproject/", async function (req, res) {
  console.log("Inside add new costum right nowe");
  console.log(req.body);
  var sqlquery =
    "insert into costume(costumename,source,description) values(?,?,?)";
  result1 = await query(pool, sqlquery, [
    req.body.name,
    req.body.source,
    req.body.description,
  ]).catch(console.log);
  console.log(result1.insertId);

  sqlquery = "insert into project_costumes(projectid,costumeid) values(?,?)";
  result = await query(pool, sqlquery, [
    req.body.projectid,
    result1.insertId,
  ]).catch(console.log);
  // console.log(result)
  res.status(201).send(result);
});

module.exports = router;
