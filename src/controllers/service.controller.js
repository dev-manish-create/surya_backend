import Service from "../models/Service.js";

// Get all active services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching services" });
  }
};

// Add a new service
export const addService = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;
    const newService = new Service({ title, description, image, category });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
