
import { products } from "./constants/data.js"

import Product from "./models/product.model.js";

const DefaultData = async () => {
    try {
        await Product.insertMany(products);

        console.log('Data imported Successfully');
    } catch (error) {
        console.log('Data Already imported Successfully', error.message);
    }
}

export default DefaultData;