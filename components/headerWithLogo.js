import StandardHeader from './header'
import MobileNavWithLogo from '../components/mobileNavWithLogo'

export default function HeaderWithLogo() {
    return (
        <StandardHeader className="orange-header text-white">
            <MobileNavWithLogo />
        </StandardHeader>
    )
}
