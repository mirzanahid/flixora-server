// import { model, Schema } from 'mongoose'

// import { TAdminAction } from './admin.interface'

// const adminActionSchema = new Schema<TAdminAction>(
//   {
//     adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     actionType: {
//       type: String,
//       enum: [
//         'user-delete',
//         'user-deactivate',
//         'user-promote-moderator',
//         'user-warn',
//         'movie-approve',
//         'movie-reject',
//         'movie-update',
//         'movie-visibility-change',
//       ],
//       required: true,
//     },
//     description: { type: String, required: true },
//     userId: { type: Schema.Types.ObjectId, ref: 'User' },
//     movieId: { type: Schema.Types.ObjectId, ref: 'Movie' },
//     deactivationDuration: { type: Number }, // Days
//     visibilityStatus: {
//       type: String,
//       enum: ['public', 'private', 'restricted'],
//     },
//     warningMessage: { type: String },
//     rejectionMessage: { type: String },
//   },
//   { timestamps: true },
// )

// export const AdminAction = model<TAdminAction>('AdminAction', adminActionSchema)
