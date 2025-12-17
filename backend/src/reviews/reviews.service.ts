import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async create(dto: CreateReviewDto) {
    const created = await this.reviewModel.create({
      name: dto.name,
      email: dto.email,
      rating: dto.rating,
      message: dto.message,
      status: 'published',
    });

    const createdObj = created.toObject() as Review & {
      _id: { toString(): string };
      createdAt?: Date;
    };

    return {
      id: createdObj._id.toString(),
      name: createdObj.name,
      rating: createdObj.rating,
      message: createdObj.message,
      createdAt: createdObj.createdAt,
    };
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.reviewModel
        .find({ status: 'published' })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.reviewModel.countDocuments({ status: 'published' }).exec(),
    ]);

    return {
      data: items.map((item) => {
        const createdAt =
          (item as { createdAt?: Date }).createdAt ??
          (item as { created_at?: Date }).created_at ??
          undefined;

        return {
          id: item._id.toString(),
          name: item.name,
          rating: item.rating,
          message: item.message,
          createdAt,
        };
      }),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }

  async remove(id: string) {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    await review.deleteOne();
    return { success: true };
  }
}


