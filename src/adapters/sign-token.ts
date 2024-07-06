import { sign } from "jsonwebtoken"

interface SignTokenProps {
  payload: {
    userId: string
    firstName: string
    lastName: string
    email: string
  }
}

export class SignToken {
  execute({ payload }: SignTokenProps) {
    return sign(
      {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
      },
      process.env.JWT_SECRET,
      {
        subject: payload.userId,
        expiresIn: "30d",
      },
    )
  }
}
