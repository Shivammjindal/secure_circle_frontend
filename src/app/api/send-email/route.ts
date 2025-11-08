import { MailerSend, EmailParams, Sender, Recipient } from "mailersend"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){

     const user_data:{
        image_url: string,
        location: string,
    } = await request.json()

    const mailerSend = new MailerSend({
        apiKey: process.env.MAIL_SERVICE_TOKEN as string
    });

    const personalization = [
        {
            email:'shivamjindals2002@gmail.com',
            data:{
                "products":[
                    {
                        "url": user_data.location,
                        "crime": "Crime Occured!",
                        "image": user_data.image_url,
                        "description": "A Crime has been occured in your area please reach at site 'AS SOON AS POSSIBLE'"
                    }
                ]
            }   
        }
    ];

    const sentFrom = new Sender(process.env.MAIL_SENDER as string, "Secure Circle");

    const recipients = [
        new Recipient("shivamjindals2002@gmail.com",'shivam')
    ];

    const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("Kidnapping Occured")
    .setTemplateId(process.env.MAIL_SERVER_TEMPLATE_ID as string)
    .setPersonalization(personalization)
    
    const response = await mailerSend.email
    .send(emailParams)
    .then(() => {
        return true
    })
    .catch((error) => {
        console.log('E an Error Occured',error)
        return false
    })


    if(!response){
        return new NextResponse('Error in Sending Email', {
            'status':500
        })
    }

    return new NextResponse('hi',{
        status: 200
    })
}