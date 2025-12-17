import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AdminUser, AdminUserDocument } from './schemas/admin-user.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(AdminUser.name)
    private readonly adminModel: Model<AdminUserDocument>,
  ) { }

  async validateUser(email: string, password: string) {
    const admin = await this.adminModel.findOne({ email }).exec();

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, admin.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return admin;
  }

  async login(admin: AdminUserDocument) {
    const payload = { sub: admin._id.toString(), email: admin.email, role: admin.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
        name: admin.name,
      },
    };
  }

  async getProfile(adminId: string) {
    const admin = await this.adminModel
      .findById(adminId)
      .select('-password')
      .lean()
      .exec();
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  async createAdmin(dto: CreateAdminDto) {
    const existing = await this.adminModel.findOne({ email: dto.email }).exec();
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const created = await this.adminModel.create({
      email: dto.email,
      password: hashed,
      name: dto.name,
      role: dto.role || 'editor',
    });

    return {
      id: created._id.toString(),
      email: created.email,
      name: created.name,
      role: created.role,
    };
  }

  async findAllAdmins() {
    return this.adminModel
      .find()
      .select('-password')
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async updateAdmin(id: string, dto: UpdateAdminDto) {
    const admin = await this.adminModel.findById(id).exec();
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    if (dto.email && dto.email !== admin.email) {
      const existing = await this.adminModel.findOne({ email: dto.email }).exec();
      if (existing) {
        throw new ConflictException('Email already registered');
      }
      admin.email = dto.email;
    }

    if (dto.name) {
      admin.name = dto.name;
    }

    if (dto.role) {
      admin.role = dto.role;
    }

    if (dto.password) {
      admin.password = await bcrypt.hash(dto.password, 10);
    }

    await admin.save();

    return {
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    };
  }

  async removeAdmin(id: string) {
    const result = await this.adminModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Admin not found');
    }
    return { success: true };
  }

  async ensureDefaultAdmin(dto: CreateAdminDto) {
    const existing = await this.adminModel.findOne({ email: dto.email }).exec();
    if (existing) {
      return existing;
    }
    const DEFAULT_ADMIN_ROLE = 'super_admin';
    await this.createAdmin({ ...dto, role: dto.role ?? DEFAULT_ADMIN_ROLE });
    return this.adminModel.findOne({ email: dto.email }).exec();
  }
}

