import Rate from "../models/Rates.js";

export const getRates = async (req, res) => {
  try {
    const rates = await Rate.find(); // return everything as-is

    res.status(200).json({rates});

  }
   catch (err) {
    
    next(err);
}
};
