var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    item: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: Number,
    user:String
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

export default mongoose.model('Cart', cartSchema);