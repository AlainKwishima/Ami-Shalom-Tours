import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GalleryItem, GalleryItemDocument } from './schemas/gallery.schema';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { promises as fs } from 'fs';
import * as path from 'path';
import { Express } from 'express';
import { StorageService } from '../shared/storage.service';

const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads/gallery');

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(GalleryItem.name)
    private readonly galleryModel: Model<GalleryItemDocument>,
    private readonly storage: StorageService,
  ) {}

  async findAll(page = 1, limit = 20, destinationId?: string) {
    const skip = (page - 1) * limit;

    const filters: Record<string, unknown> = {};
    if (destinationId && Types.ObjectId.isValid(destinationId)) {
      filters.destinationId = new Types.ObjectId(destinationId);
    }

    const [items, total] = await Promise.all([
      this.galleryModel.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.galleryModel.countDocuments(filters).exec(),
    ]);

    return {
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async findOne(id: string) {
    const item = await this.galleryModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException('Gallery item not found');
    }
    return item;
  }

  async create(dto: CreateGalleryDto, file?: Express.Multer.File) {
    let imageUrl = dto.imageUrl;

    if (file) {
      if (this.storage.isConfigured()) {
        try {
          imageUrl = await this.storage.uploadImage(file);
        } catch {
          await fs.mkdir(UPLOAD_DIR, { recursive: true });
          const filename = `${Date.now()}-${file.originalname}`;
          const filePath = path.join(UPLOAD_DIR, filename);
          await fs.writeFile(filePath, file.buffer);
          imageUrl = `/uploads/gallery/${filename}`;
        }
      } else {
        await fs.mkdir(UPLOAD_DIR, { recursive: true });
        const filename = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(UPLOAD_DIR, filename);
        await fs.writeFile(filePath, file.buffer);
        imageUrl = `/uploads/gallery/${filename}`;
      }
    }

    const created = await this.galleryModel.create({
      imageUrl,
      caption: dto.caption || '',
      destinationId:
        dto.destinationId && Types.ObjectId.isValid(dto.destinationId)
          ? new Types.ObjectId(dto.destinationId)
          : undefined,
    });

    return created;
  }

  async remove(id: string) {
    const item = await this.galleryModel.findByIdAndDelete(id).exec();
    if (!item) {
      throw new NotFoundException('Gallery item not found');
    }

    if (item.imageUrl?.startsWith('/uploads/gallery/')) {
      const filePath = path.join(process.cwd(), item.imageUrl);
      try {
        await fs.unlink(filePath);
      } catch {
        // ignore missing file
      }
    }

    return { success: true };
  }
}

