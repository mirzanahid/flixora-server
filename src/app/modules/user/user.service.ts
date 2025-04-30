import AppError from '../../errors/AppError'
import { TUser } from './user.interface'
import { User } from './user.model'
import status from 'http-status-codes'
const getUsersFromDB = async () => {
  const result = await User.find()

  if (!result.length) {
    throw new AppError(status.OK, 'No user found!')
  }
  return result
}
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id)
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'User is not found!')
  }

  return result
}
const updateUserIntoDB = async (id: string, data: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'User is not found!')
  }
  return result
}

const userDeactivateIntoDB = async (id: string) => {
  const userData = await User.findById(id)

  if (!userData) {
    throw new AppError(status.NOT_FOUND, 'User not found')
  }

  const { isDeactivate } = userData

  const updateIsDeactivate = !isDeactivate

  const result = await User.findByIdAndUpdate(
    id,
    {
      isDeactivate: updateIsDeactivate,
    },
    {
      new: true,
      runValidators: true,
    },
  )

  const message = updateIsDeactivate
    ? 'User deactivate successfully'
    : 'User activate successfully'

  return { result, message }
}

export const userServices = {
  getUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  userDeactivateIntoDB,
}
