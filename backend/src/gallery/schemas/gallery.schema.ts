import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GalleryItemDocument = GalleryItem & Document;

@Schema({ timestamps: true })
export class GalleryItem {
  @Prop({ required: true })
  imageUrl: string;

  @Prop({ default: '' })
  caption: string;

  @Prop({ type: Types.ObjectId, ref: 'Destination', required: false })
  destinationId?: Types.ObjectId;
}

export const GalleryItemSchema = SchemaFactory.createForClass(GalleryItem);







