import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PageDocument = Page & Document;

@Schema({ timestamps: true })
export class Page {
  @Prop({ required: true, unique: true, lowercase: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  content: string;

  @Prop({ type: Map, of: String, default: {} })
  sections: Map<string, string>;
}

export const PageSchema = SchemaFactory.createForClass(Page);







