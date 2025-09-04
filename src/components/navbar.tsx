import logo from '../../public/la-restinga-logo.svg';
import Image from 'next/image'

export default function Navbar() {
    return(
        <nav className='flex bg-whitemid rounded-r-4xl rounded-l-4xl w-fit p-4 fixed top-0 z-10 m-5'>
            <Image 
                src={logo}
                alt='logo'
                width={200}
            />
        </nav>

    );
}