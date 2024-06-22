import { FaGrip } from "react-icons/fa6";


export default function Header() {

    return (

        <>

            <nav className="navbar bg-body-tertiary shadow nav-rounded">
                <div className="container-fluid px-4">
                    <span className="navbar-brand mb-0 h1"><FaGrip /> Products</span>
                </div>
            </nav>

        </>

    )

}