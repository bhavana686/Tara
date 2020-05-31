var express = require("express");
var router = express.Router();
const pool = require("../dbConfig");
const query = require("../helpers/query");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

router.post("/user", async (req, res) => {
  var flag = 0;
  try {
    let dbquery = `SELECT userid FROM users where uid="${req.body.userid}";`;
    console.log(dbquery);
    userIdResult = await query(pool, dbquery).catch(console.log);
    console.log("User Id is ", userIdResult[0].userid);
    // var dbquery =
    //   "select fk_UserId from userwithusergroup where  fk_UserGroupId  in (select UserGroupId from usergroups where UserGroup=?)";
    dbquery =
      "select * from accessrights where accessId in (\
          select fk_AccessRightId from usergroupswithar where fk_UserGroupID in ( \
              select fk_UserGroupId from userwithusergroup where fk_UserId in ( \
                  select user_Id from project_users where project_Id = ? and user_Id = ?) ))";
    console.log("inside accessright");
    result = await query(pool, dbquery, [
      req.body.projectid,
      userIdResult[0].userid,
    ]).catch(console.log);
    console.log(result);
    console.log(dbquery);
    if (result) {
      for (temp of result) {
        if (temp.accessRight == req.body.accessright) {
          console.log("yes he has accessright");
          console.log(temp.accessRight);
          flag = 1;
          res.send(true);
        }
      }

      if (flag == 0) {
        console.log("no he doesnt have an accessright");
        res.send(false);
      }
    }
    // res.send(userIdResult[0]);
  } catch (ex) {
    return res.status(500).send(ex);
  }
});

module.exports = router;
