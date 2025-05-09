/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}

export type TUserWithId = TUser & { _id: Types.ObjectId };

export interface UserModel extends Model<TUser> {
  userExistenceCheckingByEmail(email: string): Promise<TUser>;
  userExistenceCheckingByID(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<Boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
