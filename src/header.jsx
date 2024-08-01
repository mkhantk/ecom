
const Header = () => {

    return(
        <>
            <header className="flex gap-5 justify-end items-center p-5 bg-green-600 bg-opacity-20 mb-5">
                <h1 className="logo mr-auto text-5xl font-bold">Ecom</h1>
                <input type="search" name="" id="search" className="ring mr-auto rounded-full px-5 py-1"/>
                <nav className="list-none flex gap-5">
                    <li>link1</li>
                    <li>link2</li>
                    <li>link3</li>
                </nav>
            </header>
        </>
    )
}

export default Header;