import ProductModel from '../models/product.schema';
import { findByUser, findByUserAndProduct } from './cart.service';

export const findAllAsync = async ({title, ...rest} = {}, user) => {
    const filters = {}
    if(title) {
        filters.title =  new RegExp(title, 'i')
    }

    const list = await ProductModel.find({...filters, ...rest});
    if(user) {
        const userList = await findByUser(user);
        if(userList.length > 0){
            return list.map(r => {
                const cart = userList.find(w => `${w.item._id}` === `${r._id}`);
                return {
                    ...r._doc,
                    isWhishlisted:  cart ? true : false,
                    cartId: cart && cart._id
                }
            })
        }
    }
    return list;
}

export const findOne = async (id, user) => {
    const data = await ProductModel.findOne({_id: id});
    const cart = await findByUserAndProduct(user, id);
    if (user && cart) {
        return {
            ...data._doc,
            isWhishlisted: true,
            cartId: cart._doc._id

        }
    }
    return data;
}

export const createProduct = async (product) => {
    const row = new ProductModel(product);
    return await row.save();
}