import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";

export async function POST(request:Request) {
    await dbConnect()

    try {
       const { username, code} = await request.json() 

      const decodedUserame = decodeURIComponent(username)
      const user = await UserModel.findOne({username: decodedUserame})
        if(!user){
            return Response.json(
                {
                  success: false,
                  message: "User not found",
                },
                { status: 500 }
              );
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()

            return Response.json(
                {
                  success: true,
                  message: "Account verified",
                },
                { status: 200 }
              );
        }else if(!isCodeNotExpired){
            return Response.json(
                {
                  success: false,
                  message: "Verification code expired, please signup again to get a new code",
                },
                { status: 500 }
              );
        }else{
            return Response.json(
                {
                  success: false,
                  message: "Incorrect Verifiaction Code",
                },
                { status: 500 }
              );
        }
    } catch (error) {
        console.error("Error Verifying User.", error)
        return Response.json({
            success: false,
            message: 'Error Verifying User.'
        },
        {status: 500}
        )
    }
}