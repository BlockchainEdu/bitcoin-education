import MobileDropdown from "./mobileDropdown"

const MobileNav = () => {
    return (
        <nav>
            <div className="max-w-7xl md:px-0 flex m-auto justify-between items-center">
                <div className="hidden">
                    <a href="/"><img className="flex w-20 mobile-logo" src="/images/ben-vertical-alt.svg" /></a>
                </div>
                <div className="">
                    <MobileDropdown />
                </div>
            </div>
        </nav>
    )
}

export default MobileNav
