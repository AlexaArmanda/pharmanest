import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineMedicalInformation } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { RiContactsBook3Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { CgFacebook } from "react-icons/cg";
import { CgInstagram } from "react-icons/cg";


const Footer =() => {
    return (
        <footer> 
            <div className="container">
                <div className="topInfo row">
                    <div className="col d-flex align-items-center">
                        <span><IoMdInformationCircleOutline /></span>
                        <span className="ml-2">General Info</span>

                    </div>

                    <div className="col d-flex align-items-center">
                        <span><MdOutlineMedicalInformation /></span>
                        <span className="ml-2">Client Info</span>

                    </div>

                    <div className="col d-flex align-items-center">
                        <span><RiCalendarScheduleLine /></span>
                        <span className="ml-2">Schedule Info</span>

                    </div>

                    <div className="col d-flex align-items-center">
                        <span><RiContactsBook3Line /></span>
                        <span className="ml-2">Contact Us</span>

                    </div>

                    
                    

                    
                </div>

                <div className="row mt-5 linkWrapper">
                    <div className="col">
                        <h5>GENERAL INFO</h5>
                        <ul>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>GENERAL INFO</h5>
                        <ul>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>GENERAL INFO</h5>
                        <ul>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>GENERAL INFO</h5>
                        <ul>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                            <li><Link to="#">Termeni si Conditii de Utilizare</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="copyright mt-3 pt-3 pb-3 d-flex">
                   
                    <p className="mb-0">Copyright 2025. All rights reserved</p>
                    <ul className="list list-inline ml-auto mb-0">
                        <li className="list-inline-item">
                            <Link to="#"><CgFacebook/></Link>
                        </li>

                        <li className="list-inline-item">
                            <Link to="#"><CgInstagram /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>

    )

}

export default Footer;