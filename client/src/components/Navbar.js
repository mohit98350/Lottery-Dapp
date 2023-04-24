import React from 'react'
import { Route, Link } from "react-router-dom"
export default function Navbar() {
    return (
        // <nav className="navbar navbar-expand-sm  ">
        //     <div className="container-fluid">
        //       <div className="collapse navbar-collapse" id="navbarNav">
        //         <ul className="navbar-nav">
        //           <li className="nav-item">
        //             <Link to="/" className="nav-link navtext" aria-current="page">

        //            Home
        //             </Link>
        //           </li>
        //           <li className="nav-item">
        //             <Link
        //               to="/manager"
        //               className="nav-link navtext"
        //               aria-current="page"
        //             >
        //               Manager
        //             </Link>
        //           </li>
        //           <li className="nav-item">
        //             <Link to="/players" className="nav-link navtext">
        //               Player
        //             </Link>
        //           </li>
        //         </ul>
        //       </div>
        //     </div>
        //   </nav>
        <nav class="navbar navbar-expand-md  bg-dark">
            <div class="container-fluid">
                <div class="nav-item text-white">
                    <Link to="/" className="navbar-brand navtext" aria-current="page">Lottery Dapp</Link>
                </div>

                <button class="navbar-toggler  " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon   "></span>
                </button>
                <div class="collapse navbar-collapse  " id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to="/manager" className="nav-link navtext" aria-current="page">

                                Manager
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/players" className="nav-link navtext" aria-current="page">

                                Player
                            </Link>
                        </li>


                    </ul>
                </div>
            </div>
        </nav>


    )
}
