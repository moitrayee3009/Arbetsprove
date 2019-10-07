
import Link from 'next/link';

function Navbar() {
    return (
        <nav>
            <div>
                <ul>
                    {/* <li> <Link href="/"><a title="StockZoom"> StockZoom</a></Link></li> */}
                    <li> <Link href="/users"><a title="Users">User</a></Link></li>
                    <li> <Link href="/userDetails"><a title="Users Details">User Details</a></Link></li>
                </ul>
            </div>

            <style jsx> {`
                    ul{
                        background: transparent;
                        list-style: none;
                        display: flex;
                    }

                    ul li {
                        font-size: 18px;
                    }

                    ul li a {
                        text-decoration: none;
                        color: #40c3dd !important;
                        font-weight: bold;
                        font-size: 30px;
                        padding-right: 20px;
                    }
                `}

            </style>
        </nav>
    )
}


export default Navbar;