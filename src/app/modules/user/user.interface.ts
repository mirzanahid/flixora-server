/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'
export type TUser = {
  id: string
  username: string
  email: string
  password: string
  profileImage: string
  role: 'user' | 'admin' | 'moderator' | 'superadmin'
  isDeactivate: boolean
  isDeleted: boolean
  watchlist?: string[]
  favorites?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>
  isUserExistsByCustomEmail(email: string): Promise<TUser>
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}
