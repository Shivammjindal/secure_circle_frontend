import { ImageKitProvider } from "imagekitio-next"

export const authenticator = async () => {

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/imagekit-auth`)

        if(!response.ok){
            const responseErrorText = response.text();
            throw new Error(
                `Request Failed with status ${response.status} : ${responseErrorText}`
            ) 
        }
    
        const data = await response.json()
        const { signature, expire, token } = data
    
        return { signature, expire, token }

    } catch (error: unknown) {
        console.log(error)
        throw new Error('Error Occured in ImageKit Provider')
    }
}

export default function ImakeKitProviders({children} : {children : React.ReactNode}){
    return (
        <ImageKitProvider
            urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
            publicKey={process.env.NEXT_PUBLIC_PUBLIC_KEY}
            authenticator={authenticator}
        >
            {children}
        </ImageKitProvider>
    )
}