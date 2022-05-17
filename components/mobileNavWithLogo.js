import MobileDropdown from "./mobileDropdown"

const MobileNav = () => {
    return (
        <nav>
            <div className="max-w-7xl md:px-0 bg-white flex m-auto justify-between items-center py-7">
                <div className="">
                    <a href="/"><img className="w-36" src="/images/ben-vertical-white.svg" /></a>
                </div>
                <div className="">
                    <MobileDropdown />
                </div>
            </div>
        </nav>
    )
}

export default MobileNav