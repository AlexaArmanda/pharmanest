import Logo from '../../assets/images/PharmaNest.png';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FaRegUser } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import SearchBox from './SearchBox';
import Navigation from './Navigation';
const Header = () => {

    return(
        
        <div className="headerWrapper">
            <div className="top-strip bg-green">
                <div className="container-fluid">
                    <p className="mb-0 mt-0 text-center">Use the code SPRING20 for 20% off your next purchase!</p>
                </div>
            </div>

            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="logoWrapper d-flex align-items-center col-sm-2">
                            <Link to={'/'}><img src = {Logo} alt="Logo"></img></Link>
                        </div>

                        <div className='col-sm-10 d-flex align-items-center part2'> 

                            <SearchBox/>

                            <div className='part3 d-flex align-items-center ml-auto'>
                                <Button className='circle mr-3'><FaRegUser /></Button>
                                <div className='ml-auto cartTab d-flex align-items-center'>
                                    <span className='price'>3.26$</span>
                                    <div className='position-relative ml-2'>
                                    <Button className='circle ml-2'><GrCart /></Button>
                                    <span className='count d-flex align-items-center justify-content-center'>1</span>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </header>

            <Navigation/>


        </div>
    )
}

export default Header;