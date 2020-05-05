const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
  getSellerDetails, getSellerProducts , getAllSellers,
  updateProfile

} = require("./seller.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
router.get("/getSellerDetails", getSellerDetails);
router.get("/getAllSellers", getAllSellers);

router.get("/getSellerProducts", getSellerProducts);
router.post("/updateProfile", updateProfile);


module.exports = router;