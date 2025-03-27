// import React, { useEffect, useState } from "react";
// import ProductItem from "../ProductItem";
// import { getProducts } from "../../services/productService";

// const ProductList = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const data = await getProducts();
//                 setProducts(data);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     return (
//         <div className="product-list">
//             {products.length > 0 ? (
//                 products.map((product) => <ProductItem key={product.id} product={product} />)
//             ) : (
//                 <p>Loading products...</p>
//             )}
//         </div>
//     );
// };

// export default ProductList;
