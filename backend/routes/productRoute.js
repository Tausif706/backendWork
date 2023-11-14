// import express from 'express';
// import { ProductListing } from '../models/productListingModel';
// import bodyParser from 'body-parser';
// const router = express.Router();


// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());


// // Create a new product listing
// router.post('/create', async (req, res) => {
//     try {
//       const { name, description, price, seller } = req.body;
//       const newProductListing = new ProductListing({
//         name,
//         description,
//         price,
//         seller,
//       });
  
//       const productListing = await newProductListing.save();
//       res.status(201).json(productListing);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to create a product listing.' });
//     }
//   });
  
//   // Get all product listings
//   router.get('/list', async (req, res) => {
//     try {
//       const productListings = await ProductListing.find().populate('seller', 'username'); // Populate the seller's username from the User model
//       res.status(200).json(productListings);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to retrieve product listings.' });
//     }
//   });

//   export default router;

import express from 'express';
import { ProductListing } from '../models/productListingModel.js';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Create a new product listing
router.post('/create', async (req, res) => {
  try {
    const { name, description, price, seller , chatRoomId } = req.body;
    const newProductListing = new ProductListing({
      name,
      description,
      price,
      seller,
      chatRoomId,
    });

    newProductListing.save()
      .then((productListing) => {
        res.status(201).json(productListing);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Failed to create a product listing.' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create a product listing.' });
  }
});

// Get all product listings
router.get('/list', async (req, res) => {
  try {
    const productListings = await ProductListing.find().populate('seller', 'username');
    res.status(200).json(productListings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve product listings.' });
  }
});

export default router;
