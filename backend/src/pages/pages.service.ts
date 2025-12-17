import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name)
    private readonly pageModel: Model<PageDocument>,
  ) {}

  async create(dto: CreatePageDto) {
    const existing = await this.pageModel.findOne({ slug: dto.slug }).exec();
    if (existing) {
      throw new ConflictException('Page already exists');
    }

    const created = await this.pageModel.create({
      slug: dto.slug,
      title: dto.title,
      content: dto.content ?? '',
      sections: dto.sections ?? {},
    });

    return created;
  }

  async findAll() {
    return this.pageModel.find().sort({ slug: 1 }).exec();
  }

  async findOne(slug: string) {
    const page = await this.pageModel.findOne({ slug }).exec();
    if (!page) {
      throw new NotFoundException('Page not found');
    }
    return page;
  }

  async upsert(slug: string, dto: UpdatePageDto) {
    const updated = await this.pageModel
      .findOneAndUpdate(
        { slug },
        {
          $set: {
            ...(dto.title !== undefined ? { title: dto.title } : {}),
            ...(dto.content !== undefined ? { content: dto.content } : {}),
            ...(dto.sections !== undefined ? { sections: dto.sections } : {}),
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      )
      .exec();

    return updated;
  }

  async update(id: string, dto: UpdatePageDto) {
    const page = await this.pageModel.findByIdAndUpdate(
      id,
      {
        ...(dto.title !== undefined ? { title: dto.title } : {}),
        ...(dto.content !== undefined ? { content: dto.content } : {}),
        ...(dto.sections !== undefined ? { sections: dto.sections } : {}),
      },
      { new: true },
    );

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }
}







