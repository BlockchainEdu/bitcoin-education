import MobileDropdown from "./mobileDropdown"

const MobileNav = () => {
    return (
        <nav>
            <div className="max-w-7xl md:px-0 bg-white flex m-auto justify-between items-center">
                <div className="">
                    <MobileDropdown />
                </div>
            </div>
        </nav>
    )
}

export default MobileNav
