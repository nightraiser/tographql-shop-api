var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    title: String,
    description: String,
    price: String,
    inventory: Number,
    availableVariants: [String],
    averageRating: Number,
    image: String
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

export default mongoose.model('Product', productSchema);