import { Link } from "@mui/material";
import Sidebar from "../../Components/Sidebar"
import Button from '@mui/material/Button';
import { LuMenu } from "react-icons/lu";
import { MdGridView } from "react-icons/md";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { TfiLayoutGrid4 } from "react-icons/tfi";
import ProductItem from "../../Components/ProductItem"
import { useState } from "react";
import Pagination from '@mui/material/Pagination';

const Listing = () => {

    const [productView, setProductView] = useState('four');
    return (
        <section className="productListingPage"> 
            <div className="container">
                <div className="productListing d-flex">
                    <Sidebar/>

                    <div className="contentRight"> 
                       <Link to="#"><img src="https://images.unsplash.com/photo-1692131781426-8c6873b71432?q=80&w=1050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxw
                       aG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-100" alt="img" style={{borderRadius:'8px'}}/></Link>
                   
                    <div className="showBy mt-3 mb-3 d-flex align-items-center">
                        <div className="d-flex btnWrapper align-items-center">
                            <Button onClick={()=>setProductView('one')}> <LuMenu /></Button>
                            <Button onClick={()=>setProductView('two')}> <MdGridView /></Button> 
                            <Button onClick={()=>setProductView('three')}><TfiLayoutGrid3 /></Button>
                            <Button onClick={()=>setProductView('four')}><TfiLayoutGrid4 /></Button>
                        </div>

                        
                    </div>

                    <div className="productListing">
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                   
                    </div>

                    <div className="d-flex align-items-center justify-content-center mt-5">
                        <Pagination count={10} color="primary" size="large"/>
                    </div>

                    </div>
                </div>

            </div>
        </section>
    )

}

export default Listing;