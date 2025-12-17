import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { UpdatePageDto } from './dto/update-page.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Public()
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.pagesService.findOne(slug);
  }

  @Roles('super_admin')
  @Post()
  create(@Body() dto: CreatePageDto) {
    return this.pagesService.create(dto);
  }

  @Roles('super_admin', 'editor')
  @Patch(':slug')
  upsert(@Param('slug') slug: string, @Body() dto: UpdatePageDto) {
    return this.pagesService.upsert(slug, dto);
  }
}







