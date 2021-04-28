const express = require('express');
const router = express.Router();

const Info = require('../models/Document');
const Sale = require('../models/SaleModel');


router.get("/bid", (req, res) => {

  Sale.find()
    .then(doc => res.json(doc))
    .catch(err => res.status(400).res.json(`Error:${err}`));

});
router.get("/buybid/:id", (req, res) => {
  Sale.find({ _id: req.params.id })
    .then(found => res.json(found))
    .catch(err => res.status(400).json(`Error:${err}`));
});
router.delete('/buybid/delete/:id', (req, res) => {
  Sale.findByIdAndDelete(req.params.id, (err) => {
    if (!err) {
      res.json("This article deleted Succesfully")
    }
    else res.status(400).json(err);
  })
});
router.put('/bid/update/:id', (req, res) => {
  Sale.findById(req.params.id, (err, found) => {

    found.amount = req.body.amount;
    found.save((err) => {
      if (!err) {
        res.json("Updated Succesfully");
      } else res.status(400).send("Failed! Please try again later");
    })
  });
});

router.post("/bid", (req, res) => {

  const item = new Sale({
    _id: req.body._id,
    link: req.body.link,
    title: req.body.title,
    seller: req.body.seller,
    amount: req.body.ammount,
    price: req.body.price,
  });

  item.save()
    .then(() => res.json("Document added successfully"))
    .catch(err => res.status(400).json(`Error:${err}`));
});

router.get("/", (req, res) => {

  Info.find()
    .then(doc => res.json(doc))
    .catch(err => res.status(400).res.json(`Error:${err}`));

});

router.get("/requests", (req, res) => {

  Info.find()
    .then(doc => res.json(doc))
    .catch(err => res.status(400).res.json(`Error:${err}`));

});
router.post("/create", (req, res) => {

  const item = new Info({
    title: req.body.title,
    symbol: req.body.symbol,
    tokenPrice: req.body.tokenPrice,
    tokenNumber: req.body.tokenNumber,
    houseNo: req.body.houseNo,
    plot: req.body.plot,
    owner: req.body.owner,
    deed: req.body.deed,
    ward: req.body.ward,
    roadNo: req.body.roadNo,
    postCode: req.body.postCode,
    area: req.body.area,
    content: req.body.content,
    hash: req.body.hash,
    video: req.body.video,
    state: 0
  });
  item.save()
    .then(() => res.json("Document added successfully"))
    .catch(err => console.log(err));
});

router.get("/:id", (req, res) => {
  Info.findById(req.params.id)
    .then(found => res.json(found))
    .catch(err => res.status(400).json(`Error:${err}`));
});



//Find Article by Id and update

router.put('/update/:id', (req, res) => {
  Info.findById(req.params.id, (err, found) => {
    found.state += 1;
    found.save((err) => {
      if (!err) {
        res.json("Updated Succesfully");
      } else res.staus(400).send("Failed! Please try again later");
    })
  });
})
//
router.put("/token/:id", (req, res) => {
  Info.findById(req.params.id, (err, found) => {
    found.tokenNumber = req.body.tokenNumber;
    found.save((err) => {
      if (!err) {
        res.json("Updated Succesfully");
      } else res.status(400).send("Failed! Please try again later");
    })
  });
});
// 
router.put("/owner/:id", (req, res) => {
  Info.findById(req.params.id, (err, found) => {

    found.owner = req.body.owner;
    found.save((err) => {
      if (!err) {
        res.json(found);
      } else res.status(400).send("Failed! Please try again later");
    })
  });
});
//
router.get('/sale/:id', (req, res) => {
  Info.find({ hash: req.params.id }, (err, item) => {
    if (!err) {
      res.json(item);
    }
    else {
      res.status(400).json(`Error:${err}`)
    }
  })
})

// Delete Article
router.delete("/delete/:id", (req, res) => {
  Info.findByIdAndDelete(req.params.id, (err) => {
    if (!err) {
      res.json("This article deleted Succesfully")
    }
    else res.status(400).json("please try again later");
  })
});

module.exports = router
