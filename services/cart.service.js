import CartModel from '../models/cart.scehma';

export const findAllAsync = async () => {
    return await CartModel.find().populate('');
}

export const findByUser = async (userId) => {
    return await CartModel.find({user: userId}).populate('item');
}

export const findByUserAndProduct = async (userId, item) => {
    return await CartModel.findOne({user: userId, item}).populate('item');
}

export const addToCart = async ({item, quantity, user}) => {
    const row = new CartModel({item, quantity, user});
    return await row.save();
}

export const removeFromCart = async (cartId) => {
    console.log(cartId);
    return await CartModel.deleteOne({_id: cartId}, (err) => {
        console.log(err);
    }  );
}