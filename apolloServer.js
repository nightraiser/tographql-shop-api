import { gql, ApolloServer } from "apollo-server-express";
import * as productService from './services/product.service';
import * as cartService from './services/cart.service'
const typeDefs = gql`
    type Product {
        _id: String,
        title: String,
        escription: String,
        price: String,
        inventory: Int,
        availableVariants: [String],
        averageRating: Int,
        image: String,
        isWhishlisted: Boolean,
        cartId: String
    }
    type Cart {
        _id: String,
        quantity: Int,
        user: String,
        item: Product
    }

    type Query {
        products(title: String): [Product]
        mycart: [Cart]
    }
    type Mutation {
        mycart(productId: String): Cart
    }
`;

const resolvers = {
    Query: {
        products: async (parent, args, context ) => await productService.findAllAsync({title: args.title}, context.useId),
        mycart: async () => await cartService.findByUser(''),
    },
    Mutation: {
        mycart: async (parent, args, context) => {

            return await cartService.addToCart({
                item: args.productId,
                user: context.useId
            })
        }
    }
    
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        const userAgent = req.headers['user-agent'];
        return { useId: userAgent };
    }
});

export default server;

