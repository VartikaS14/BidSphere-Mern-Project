const express = require("express");
const {registerUser,loginUser,loginStatus,logoutUser,loginAsSeller,getUser,getUserBalance,estimateIncome,getAllUser} =require("../controllers/userCtr");

const { protect, isAdmin } = require("../middleWare/authMiddleWare");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/loggedin", loginStatus);
router.get("/logout", logoutUser);
router.post("/seller", loginAsSeller);
router.get("/getuser", protect, getUser);
router.get("/sell-amount", protect, getUserBalance);
router.get("/estimate-income", protect, isAdmin, estimateIncome);
router.get("/users", protect,isAdmin, getAllUser);



module.exports = router;