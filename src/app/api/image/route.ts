 import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import {NextRequest, NextResponse} from "next/server"


 export async function POST(request : NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session) {
        return NextResponse.json("unauthorized",{status:401})
    }
    const {prompt} = await request.json();

    const user = await prisma.user.findUnique({
        where : {
            id : session.user.id
        }
    })

    if(!user) {
        return NextResponse.json({error : "No User found"},{status : 401})
    }


    function generateRandomNumber(): number {
        return Math.floor(Math.random() * 100000000) + 1;
    }

    const randomSeed = generateRandomNumber();
    const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${randomSeed}&width=512&height=512&nologo=True`

    await fetch(imageURL)
    
    await prisma.post.create({
        data:{
            prompt : prompt,
            url : imageURL,
            seed : randomSeed
        }
    })

    return NextResponse.json({url : imageURL})
 }