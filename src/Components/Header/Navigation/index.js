import Button from '@mui/material/Button';
import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";


const Navigation =()=> {


    const [isOpenSidebarVal, setisOpenSidebarVal]= useState(false);
    return (
        <nav>
        <div className='container'>
            <div className='row'>
                <div className='col-sm-3 navPart1'>
                    <div className='catWrapper'>
                    <Button className='allcatTable align-items-center' onClick={()=>setisOpenSidebarVal (!isOpenSidebarVal)}>
                        <span className='icon1 mr-2'><IoMenu/></span>
                        <span class="text">ALL CATEGORIES</span>
                        <span className='icon2 ml-2'><FaAngleDown/></span>
                    </Button>

                    <div className={`sidebarNav ${isOpenSidebarVal===true ? 'open' : ''}`}>
                        <ul>
                            <li><Link to="/"><Button>Prescription Medicines <FaAngleRight className='ml-auto'/> </Button></Link>
                                <div className='submenu'>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                </div>
                            </li>
                            <li><Link to="/"><Button>Over-the-Counter Medicines<FaAngleRight className='ml-auto'/></Button></Link>
                                <div className='submenu'>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                </div>
                            </li>
                            <li><Link to="/"><Button>Vitamins & Supplements<FaAngleRight className='ml-auto'/></Button></Link>
                                <div className='submenu'>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                </div>
                            </li>
                            <li><Link to="/"><Button>Personal Care & Hygiene<FaAngleRight className='ml-auto'/></Button></Link>
                                 <div className='submenu'>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                </div>
                            </li>
                            <li><Link to="/"><Button>Baby & Mother Care<FaAngleRight className='ml-auto'/></Button></Link>
                                <div className='submenu'>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                </div>
                            </li>
                            <li><Link to="/"><Button>First Aid & Wound Care<FaAngleRight className='ml-auto'/></Button></Link>
                                <div className='submenu'>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                </div>
                            </li>
                            <li><Link to="/"><Button>Medical Devices & Equipment<FaAngleRight className='ml-auto'/></Button></Link>
                                <div className='submenu'>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                </div>
                            </li>
                            <li><Link to="/"><Button>Herbal & Ayurvedic Products<FaAngleRight className='ml-auto'/></Button></Link>
                                <div className='submenu'>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                    <Link to="/"><Button>General Health</Button></Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                    
                </div>
                <div className='col-sm-9 navPart2 d-flex align-items-center'>
                    <ul className='list list-inline ml-auto'>
                        <li className='list-inline-item'><Link to="/"><Button>Home</Button></Link></li>
                        <li className='list-inline-item'><Link to="/"><Button>New Products</Button>
                        </Link><div className='submenu shadow'>
                            <Link to="/"><Button>General Health</Button></Link>
                            <Link to="/"><Button>General Health</Button></Link>
                            <Link to="/"><Button>General Health</Button></Link>
                        </div>
                        </li>
                        <li className='list-inline-item'><Link to="/"><Button>On Sale</Button></Link></li>
                        <li className='list-inline-item'><Link to="/"><Button>Contact</Button></Link></li>
                        <li className='list-inline-item'><Link to="/"><Button>About Us</Button></Link></li>
                    </ul>
                    </div>
            </div>
        </div>
    </nav>
    )
}

export default Navigation;