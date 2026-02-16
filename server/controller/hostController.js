
const hostModel = require("../model/hostModel");

exports.getAll = async (req, res) => {
  const [propertyDetails] = await hostModel.fetchAll();
  res.json(propertyDetails);
};

exports.postProperty = async (req, res, next) => {
  try {
    const { propertyName, location, price, imageUrl, ownerName } = req.body;

    const host = new hostModel(propertyName, location, price, imageUrl, ownerName);
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

exports.editProperty=async(req,res)=>{
    const propertyId=req.params.id;
    const {propertyName,location,price,imageUrl,ownerName}=req.body; 
    const host=new hostModel(propertyName, location, price, imageUrl, ownerName);
    try {
        const [result]=await host.update(propertyId);
        console.log("Update result:", result);
        if(result.affectedRows>0){
            res.json({
                message:'Property updated successfully'
            })
        }else{
            res.status(404).json({
                message:'Property not found'
            })
        }
    } catch (error) {
        console.error("Error updating property:", error);
        res.status(500).json({
            message:'Failed to update property'
        })
    }
}

exports.deleteProperty = async (req, res) => {
  const propertyId = req.params.id;

  try {
    const host = new hostModel();

    const [result] = await host.delete(propertyId);

    console.log("Delete result:", result);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Property deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "Property not found",
      });
    }

  } catch (error) {
    console.error("Error deleting property:", error);

    return res.status(500).json({
      message: "Failed to delete property",
    });
  }
};

