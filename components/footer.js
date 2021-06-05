import Subscribe from '../components/subscribe'

export default function Footer() {
    return (
        <section>
            <div className="max-w-7xl m-auto flex flex-col md:flex-row justify-between items-center pt-0 md:pt-24 py-24 pb-10 px-7">
                <div className="text-center md:text-left font-mont text-black max-w-lg">
                    Subscribe to the BEN newsletter to keep up to date with everything happening in the Blockchain and Education.
                </div>
                <div>
                    <Subscribe />
                </div>
            </div>
            <div className="flex flex-col md:flex-row max-w-7xl m-auto border-t py-14 px-7">
                <div className="w-full md:w-1/6"><img className="m-auto md:m-0" src="/images/logo-footer.svg" /></div>
                <div className="w-full md:w-3/6">
                    <div className="text-center md:text-left pt-6 md:pt-0 font-mont font-bold">
                        The Blockchain Education Network (BEN)
                    </div>
                    <div className="text-center md:text-left max-w-lg pt-3 m-auto md:m-0">
                        BEN is the largest and oldest netwrok of blockchain students, alumni, and professors across the world.
                    </div>
                </div>
                <div className="grid grid-cols-5 pt-10 md:pt-0 w-full md:w-2/6 gap-x-0 ml-3 md:ml-0">
                    <a target="_blank" href="https://facebook.com/blockchainedu"><img src="/images/Facebook.svg" /></a>
                    <a target="_blank" href="https://twitter.com/blockchainedu"><img src="/images/Twitter.svg" /></a>
                    <a target="_blank" href="https://instagram.com/blockchainedu"><img src="/images/Instagram.svg" /></a>
                    <a target="_blank" href="https://medium.com/blockchainedu"><img src="/images/medium.svg" /></a>
                    <a target="_blank" href="https://blockchainedu.org/discord"><img src="/images/discord.svg" /></a>
                </div>
            </div>
            <div className="bg-benblack-500 py-14 px-7">
                <div className="flex flex-col md:flex-row justify-between max-w-7xl m-auto">
                    <ul className="flex flex-col md:flex-row justify-between items-center text-white font-mont w-full md:w-2/6">
                        <a href="/"><li>Home</li></a>
                        <a href="/about"><li>About</li></a>
                        <a target="_blank" href="https://medium.com/blockchainedu"><li>Blog</li></a>
                        <a target="_blank" href="https://dev-762mr2a4.auth0.com/login?state=hKFo2SBzTkhaTnBST2o5U2ZVd3V1UEhwZ1RzcWd2YXdhb2x0SqFupWxvZ2luo3RpZNkgUThsQzdTZjZsQThtWkZSV1VvWjVveHQzT0k5eVBLVVOjY2lk2SBPOWkyNXNNRGpvZ1dFR3FTZFlEVWV3Zm94dmNkY0JsSw&client=O9i25sMDjogWEGqSdYDUewfoxvcdcBlK&protocol=oauth2&redirect_uri=https%3A%2F%2Fblockchainedu.org&location=%5Bobject%20Object%5D&computedMatch=%5Bobject%20Object%5D&dispatchConfig=%5Bobject%20Object%5D&_targetInst=%5Bobject%20Object%5D&nativeEvent=%5Bobject%20MouseEvent%5D&type=click&target=%5Bobject%20HTMLButtonElement%5D&currentTarget=%5Bobject%20HTMLButtonElement%5D&eventPhase=3&bubbles=true&cancelable=true&timeStamp=14594.60000000149&defaultPrevented=false&isTrusted=true&view=%5Bobject%20Window%5D&detail=1&screenX=-107&screenY=326&clientX=1287&clientY=38&pageX=1287&pageY=38&ctrlKey=false&shiftKey=false&altKey=false&metaKey=false&getModifierState=function%20xr(t)%7Bvar%20e%3Dthis.nativeEvent%3Breturn%20e.getModifierState%3Fe.getModifierState(t)%3A!!(t%3DAr%5Bt%5D)%26%26!!e%5Bt%5D%7D&button=0&buttons=0&relatedTarget=null&movementX=0&movementY=0&isDefaultPrevented=function%20Zn()%7Breturn!1%7D&isPropagationStopped=function%20Zn()%7Breturn!1%7D&_dispatchListeners=function()%7Breturn%20y.loginWithRedirect.apply(y%2Carguments)%7D&_dispatchInstances=%5Bobject%20Object%5D&scope=openid%20profile%20email&response_type=code&response_mode=query&nonce=VWFwZjZ6WjFJNTBySDFlNGZXeG5OQS1TZlhQY1FJVHZRLXNpNXlkSDltMw%3D%3D&code_challenge=wn-ZlHhAJFQridtAIuehmUzCoqCyQ4vPpwtIkPC7Gpw&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtc3BhLWpzIiwidmVyc2lvbiI6IjEuMTQuMCJ9"><li>Login</li></a>
                    </ul>
                    <div className="pt-10 md:pt-0 text-center md:text-left font-mont text-white">
                    © 2021 BEN All Rights Reserved
                    </div>
                </div>
            </div>
        </section>
    )
}
