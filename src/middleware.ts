import withAuth from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(

    function middleware(req){

        const url = req.nextUrl;
        const isAuthPage = url.pathname === "/login" || url.pathname === "/signup";

        if (!!req.nextauth.token && isAuthPage) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks : {
            authorized : ({token, req}) => {

                const { pathname } = req.nextUrl
                const isAuth = !!token

                if((pathname.startsWith("/api/auth") || pathname === "/login" || pathname === "/signup") && isAuth){
                    NextResponse.redirect(`${process.env.BASE_URL}`)
                }

                if(
                    (pathname.startsWith("/api/auth") || pathname === "/login" || pathname === "/signup")
                ){
                    return true
                }
            
                if(pathname === '/'){
                    return true
                }

                // !! make it boolean
                return isAuth
            }
        }
    }
)

// kha kha middleware run hona chahiye

export const config = {
    matcher: [
        '/home',
        '/login',
        '/signup',
    ],
};

// middleware.ts
// export { default } from "next-auth/middleware"

// export const config = {
//   matcher: [
//     "/home", // protected
//     "/(login|signup)",   // restrict auth pages for logged-in users
//   ],
// }

// middleware.ts
// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req) {},
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token, // allow if token exists
//     },
//   }
// );

// export const config = {
//   matcher: [
//     // Protect these routes (only logged-in users can access)
//     "/dashboard/:path*",
//     "/profile/:path*",
//   ],
// };


// import { withAuth } from "next-auth/middleware"

// export default withAuth({
//   pages:{
//     signOut:"/",
//     signIn:"/",
//   }
// })

// export const config = {
//   matcher: [
//     '/home',
//   ]
// };
