import bcrypt from 'bcrypt'
import {NextResponse} from 'next/server'
import prisma from "@/app/libs/prismadb"

export  async function POST(
  request:Request
){
  const body = await request.json()

  const {
    username,
    email,
    password
  } = body

}
