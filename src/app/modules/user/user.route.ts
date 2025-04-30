import express from 'express'
import { userControllers } from './user.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
import auth from '../../middlewares/auth'

const router = express.Router()

router.get('/', auth('admin', 'superadmin'), userControllers.getUsers)
router.get(
  '/:userId',
  auth('user', 'admin', 'superadmin'),
  userControllers.getSingleUser,
)
router.patch(
  '/:userId',
  auth('user', 'admin', 'superadmin'),
  validateRequest(UserValidation.updateUserValidationShcema),
  userControllers.updateUser,
)

router.patch(
  '/deactivate/:userId',
  auth('admin'),
  userControllers.userDeactivate,
)

export const UserRoutes = router
