import { model, Schema } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import { USER_ROLE } from './user.constant'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: [true, 'Name is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    profileImage: {
      type: String,
      default: 'default-profile-image.jpg',
    },

    role: {
      type: String,
      enum: USER_ROLE,
      default: 'user',
      required: true,
    },
    isDeactivate: {
      type: Boolean,
      default: false,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    watchlist: {
      type: [String],
      default: [],
    },
    favorites: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', function (next) {
  if (this.isModified('name') || this.isNew) {
    this.username = this.username
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }
  next()
})

userSchema.pre('save', async function (next) {
  const user = this 
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

userSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  return await User.findOne({ email })
}

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ _id: id }).select('+password')
}

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}
export const User = model<TUser, UserModel>('User', userSchema)
