import MobileNav from "./mobileNav";

export default function HeaderWithLogo() {
    return (
        <section className="pt-10 mx-7">
            <div className="block md:hidden">
             <MobileNav />   
            </div>
            <nav className="hidden md:flex max-w-7xl m-auto justify-between items-center">
                <ul className="font-mont text-black transition duration-500 w-1/3">
                    <li className="flex gap-x-14">
                      <a className="hover:text-benorange-500 transition duration-500" href="/">Home </a>
                      <a className="hover:text-benorange-500 transition duration-500" href="/about">About </a>
                    </li>
                </ul>
                <ul className="font-mont text-black w-1/3">
                    <li className="flex gap-x-14 justify-end">
                      <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://medium.com/blockchainedu">Blog </a>
                      <a className="hover:text-benorange-500 transition duration-500 ml-10" target="_blank" href="https://dev-762mr2a4.auth0.com/login?state=hKFo2SBzTkhaTnBST2o5U2ZVd3V1UEhwZ1RzcWd2YXdhb2x0SqFupWxvZ2luo3RpZNkgUThsQzdTZjZsQThtWkZSV1VvWjVveHQzT0k5eVBLVVOjY2lk2SBPOWkyNXNNRGpvZ1dFR3FTZFlEVWV3Zm94dmNkY0JsSw&client=O9i25sMDjogWEGqSdYDUewfoxvcdcBlK&protocol=oauth2&redirect_uri=https%3A%2F%2Fblockchainedu.org&location=%5Bobject%20Object%5D&computedMatch=%5Bobject%20Object%5D&dispatchConfig=%5Bobject%20Object%5D&_targetInst=%5Bobject%20Object%5D&nativeEvent=%5Bobject%20MouseEvent%5D&type=click&target=%5Bobject%20HTMLButtonElement%5D&currentTarget=%5Bobject%20HTMLButtonElement%5D&eventPhase=3&bubbles=true&cancelable=true&timeStamp=14594.60000000149&defaultPrevented=false&isTrusted=true&view=%5Bobject%20Window%5D&detail=1&screenX=-107&screenY=326&clientX=1287&clientY=38&pageX=1287&pageY=38&ctrlKey=false&shiftKey=false&altKey=false&metaKey=false&getModifierState=function%20xr(t)%7Bvar%20e%3Dthis.nativeEvent%3Breturn%20e.getModifierState%3Fe.getModifierState(t)%3A!!(t%3DAr%5Bt%5D)%26%26!!e%5Bt%5D%7D&button=0&buttons=0&relatedTarget=null&movementX=0&movementY=0&isDefaultPrevented=function%20Zn()%7Breturn!1%7D&isPropagationStopped=function%20Zn()%7Breturn!1%7D&_dispatchListeners=function()%7Breturn%20y.loginWithRedirect.apply(y%2Carguments)%7D&_dispatchInstances=%5Bobject%20Object%5D&scope=openid%20profile%20email&response_type=code&response_mode=query&nonce=VWFwZjZ6WjFJNTBySDFlNGZXeG5OQS1TZlhQY1FJVHZRLXNpNXlkSDltMw%3D%3D&code_challenge=wn-ZlHhAJFQridtAIuehmUzCoqCyQ4vPpwtIkPC7Gpw&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtc3BhLWpzIiwidmVyc2lvbiI6IjEuMTQuMCJ9"><b>Login</b></a>
                    </li>
                </ul>
            </nav>
        </section>
    )
}
