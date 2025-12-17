import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DestinationDocument = Destination & Document;

@Schema({ _id: false })
export class ItineraryItem {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop()
  day?: number;
}

const ItineraryItemSchema = SchemaFactory.createForClass(ItineraryItem);

@Schema({ _id: false })
export class DestinationEvent {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: string;

  @Prop({ default: '' })
  description: string;
}

const DestinationEventSchema = SchemaFactory.createForClass(DestinationEvent);

@Schema({ timestamps: true })
export class Destination {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true, unique: true, lowercase: true })
  slug: string;

  @Prop({ required: true, trim: true })
  location: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: '' })
  fullDescription: string;

  @Prop({ default: '' })
  price: string;

  @Prop({ default: '' })
  duration: string;

  @Prop({ type: Number, default: 0 })
  rating: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: [String], default: [] })
  highlights: string[];

  @Prop({ type: [String], default: [] })
  gallery: string[];

  @Prop({ type: [ItineraryItemSchema], default: [] })
  itinerary: ItineraryItem[];

  @Prop({ type: [String], default: [] })
  included: string[];

  @Prop({ type: [String], default: [] })
  notIncluded: string[];

  @Prop({ default: '' })
  bestTime: string;

  @Prop({ default: '' })
  difficulty: string;

  @Prop({ default: '' })
  groupSize: string;

  @Prop({ type: [DestinationEventSchema], default: [] })
  events: DestinationEvent[];
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);

DestinationSchema.index({ slug: 1 }, { unique: true });


