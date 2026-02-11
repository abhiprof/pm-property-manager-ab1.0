const db = require("../utils/database");

function generatePropertyId() {
  return 'xxxx-xxxx-xxxx'.replace(/x/g, () =>
    Math.floor(Math.random() * 10)
  );
}

module.exports = class Host {
  constructor(
    propertyName,
    location,
    price,
    imageUrl,
    ownerName,
    rating = null
  ) {
    this.idProperty = generatePropertyId();
    this.propertyName = propertyName;
    this.location = location;
    this.price = price;
    this.imageUrl = imageUrl;
    this.ownerName = ownerName;
    this.rating = rating;
  }

  save() {
    return db.execute(
      `INSERT INTO property 
       (idProperty, propertyName, location, price, imageUrl, ownerName, rating) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        this.idProperty,
        this.propertyName,
        this.location,
        this.price,
        this.imageUrl,
        this.ownerName,
        this.rating, // already null-safe
      ]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM property");
  }
};
