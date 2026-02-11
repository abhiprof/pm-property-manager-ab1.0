
const hostModel = require("../model/hostModel");

exports.getAll = async (req, res) => {
  const [propertyDetails] = await hostModel.fetchAll();
  res.json(propertyDetails);
};

exports.postProperty = async (req, res, next) => {
  try {
    const { propertyName, location, price, imageUrl, ownerName } = req.body;

    const host = new hostModel.Host(propertyName, location, price, imageUrl, ownerName);
    console.log({
      propertyName,
      location,
      price,
      imageUrl,
      ownerName,
    });

    await host.save();

    res.status(201).json({
      message: "Property added successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.getPropertyById = async (req, res) => {
    const propertyId=req.params.id;
    const [propertyDetails] = await hostModel.fetchAll();
    const property=propertyDetails.find(p=>p.idproperty===propertyId);
    if(property){
        res.json(property);
    }
    else{
        res.status(404).json({
            message:'Property not found'
        })
    }
}
