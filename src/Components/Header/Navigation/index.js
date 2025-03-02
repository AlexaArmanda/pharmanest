import Button from '@mui/material/Button';
import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navigation =()=> {

    return (
        <nav>
        <div className='container'>
            <div className='row'>
                <div className='col-sm-3 navPart1'>
                    <Button className='allcatTable align-items-center'>
                        <span className='icon1 mr-2'><IoMenu/></span>
                        <span class="text">ALL CATEGORIES</span>
                        <span className='icon2 ml-2'><FaAngleDown/></span>
                    </Button>
                </div>
                <div className='col-sm-9 navPart2 d-flex align-items-center'>
                    <ul className='list list-inline ml-auto'>
                        <li className='list-inline-item'><Link to="/"><Button>Home</Button></Link></li>
                        <li className='list-inline-item'><Link to="/"><Button>New Products</Button></Link></li>
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