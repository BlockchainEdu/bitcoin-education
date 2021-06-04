import MobileDropdown from "./mobileDropdown"

const MobileNav = () => {
    return (
        <nav>
            <div className="max-w-7xl px-5 md:px-0 bg-white flex m-auto justify-between items-center py-7">
                <div className="mx-20">
                    <a href="/"><img className="" src="/images/ben-logo.svg" /></a>
                </div>
                <div className="">
                    <MobileDropdown />
                </div>
            </div>
        </nav>
    )
}

export default MobileNav