import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import status from 'http-status-codes'
import { userServices } from './user.service'
import AppError from '../../errors/AppError'

const getUsers = catchAsync(async (req, res) => {
  const result = await userServices.getUsersFromDB()

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Users retrieve successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params
  const result = await userServices.getSingleUserFromDB(userId)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User retrieve successfully',
    data: result,
  })
})
const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params
  const userData = req.body

  if (req.user.userId !== userId) {
    throw new AppError(
      status.FORBIDDEN,
      'You are not allowed to update this profile',
    )
  }

  const result = await userServices.updateUserIntoDB(userId, userData)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Users update successfully',
    data: result,
  })
})

const userDeactivate = catchAsync(async (req, res) => {
  const { userId } = req.params

  const { result, message } = await userServices.userDeactivateIntoDB(userId)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: message,
    data: result,
  })
})
export const userControllers = {
  getUsers,
  getSingleUser,
  updateUser,
  userDeactivate,
}
