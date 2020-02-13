var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    name: String,
    items: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    quantity: [Number],
    user:String
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

export default mongoose.model('Order', orderSchema);