const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

// Before saving → lowercase + trim
categorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.name = this.name.trim().toLowerCase();
  }
  next();
});

// Before any find → lowercase + trim if name is in query
function normalizeNameInQuery(next) {
  if (this._conditions.name && typeof this._conditions.name === 'string') {
    this._conditions.name = this._conditions.name.trim().toLowerCase();
  }
  next();
}

categorySchema.pre('find', normalizeNameInQuery);
categorySchema.pre('findOne', normalizeNameInQuery);
categorySchema.pre('findOneAndUpdate', normalizeNameInQuery);

const Category = mongoose.model("Category", categorySchema, "Category");

module.exports = Category;
