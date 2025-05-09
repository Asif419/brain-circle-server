/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { Model, Types } from 'mongoose';
import { USER_ROLE, USER_STATUS } from './user.constant';
import { ObjectId } from 'mongodb';

type TAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface TUser {
  _id: ObjectId;
  clans?: ObjectId[];
  expertise?: ObjectId[];
  name: string;
  email: string;
  role: 'admin' | 'user';
  password: string;
  passwordChangedAt?: Date;
  passwordUpdatedAt?: Date;
  avatar?: string;
  coverImage?: string;
  contactNo?: string;
  address?: TAddress;
  bio?: string;
  gender?: string;
  dateOfBirth?: Date;
  status?: 'free' | 'premium' | 'suspended';
  createdAt?: Date;
  UpdatedAt?: Date;
  verified?: boolean;
  isDeleted?: boolean;
  isBlocked?: false;
}

// need to: I can remove this line
export type TUserWithId = TUser & { _id: Types.ObjectId };
// 

export interface UserModel extends Model<TUser> {
  userExistenceCheckingByEmail(email: string): Promise<TUser>;
  userExistenceCheckingByID(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<Boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
export type TUserStatus = keyof typeof USER_STATUS;
