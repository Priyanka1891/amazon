const {
    getSellerDetails, getSellerProducts , getAllSellers,
    updateProfile
  } = require("./seller.service");
  
  const jwt = require('jsonwebtoken');
  const { secret } = require('../../config/configValues');
  var kafka = require('../../kafka/client');
  
  
  module.exports = {
    getSellerDetails: (req, res) => {
      var queryObject = req.query;
      console.log('IN controller ', queryObject);
      getSellerDetails(queryObject, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },

    getAllSellers: (req, res) => {
      getAllSellers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },

    getSellerProducts: (req, res) => {
      var queryObject = req.query;
      console.log('IN controller ', queryObject);
      getSellerProducts(queryObject, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },

    updateProfile: (req, res) => {
      var body = req.body
      updateProfile(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },


  
  }