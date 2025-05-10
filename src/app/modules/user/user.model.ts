import { model, Schema, Types } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';



const userSchema = new Schema<TUser, UserModel>(
  {
    clans: [{ type: Schema.Types.ObjectId, ref: 'Clan' }],
    expertise: [{ type: Schema.Types.ObjectId, ref: 'Expertise' }],
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    passwordChangedAt: { type: Date },
    passwordUpdatedAt: { type: Date },
    avatar: String,
    coverImage: String,
    contactNo: String,
    address: {
      type:
      {
        address: {
          street: String,
          city: String,
          state: String,
          postalCode: String,
          country: String,
        },
      }
    },
    bio: String,
    gender: String,
    dateOfBirth: Date,
    status: {
      type: String,
      enum: ['free', 'premium', 'suspended'],
      default: 'free',
    },
    verified: { type: Boolean, default: false },
    isDeactivated: {type: Boolean, default: false},
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'UpdatedAt' },
  }
);


// pre middleware
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.userExistenceCheckingByEmail = async function (
  email: string,
) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.userExistenceCheckingByID = async function (id: string) {
  return await User.findById(id).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
