import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminUserDocument = AdminUser & Document;

export type AdminRole = 'super_admin' | 'editor';

@Schema({ timestamps: true })
export class AdminUser {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, enum: ['super_admin', 'editor'], default: 'editor' })
  role: AdminRole;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);

AdminUserSchema.index({ email: 1 }, { unique: true });







