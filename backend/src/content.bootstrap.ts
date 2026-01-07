import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DestinationsService } from './destinations/destinations.service';
import { ReviewsService } from './reviews/reviews.service';
import { PagesService } from './pages/pages.service';
import { MOCK_DESTINATIONS, MOCK_REVIEWS, MOCK_PAGES } from './seed/mock-destinations';

@Injectable()
export class ContentBootstrapService implements OnModuleInit {
  private readonly logger = new Logger(ContentBootstrapService.name);

  constructor(
    private readonly destinations: DestinationsService,
    private readonly reviews: ReviewsService,
    private readonly pages: PagesService,
  ) { }

  async onModuleInit() {
    try {
      // Seed destinations if empty
      const { pagination } = await this.destinations.findAll(1, 1);
      if ((pagination?.total ?? 0) === 0) {
        for (const d of MOCK_DESTINATIONS) {
          await this.destinations.create({
            title: d.title,
            slug: d.slug,
            location: d.location,
            description: d.description,
            fullDescription: (d as any).fullDescription,
            price: d.price,
            duration: d.duration,
            rating: d.rating,
            images: d.images,
            gallery: (d as any).gallery,
            highlights: d.highlights,
            included: (d as any).included,
            bestTime: (d as any).bestTime,
            groupSize: (d as any).groupSize,
            events: (d as any).events,
          });
        }
        this.logger.log(`Seeded ${MOCK_DESTINATIONS.length} destinations`);
      }

      // Seed reviews if empty
      const reviewsList = await this.reviews.findAll(1, 1);
      if ((reviewsList.pagination?.total ?? 0) === 0) {
        for (const r of MOCK_REVIEWS) {
          await this.reviews.create({ name: r.name, rating: r.rating, message: r.message });
        }
        this.logger.log(`Seeded ${MOCK_REVIEWS.length} reviews`);
      }

      // Seed pages if missing
      for (const p of MOCK_PAGES) {
        await this.pages.upsert(p.slug, {
          title: p.title,
          sections: p.sections as any,
        });
      }
      this.logger.log(`Seeded ${MOCK_PAGES.length} pages`);
    } catch (error) {
      this.logger.error('Content bootstrap failed', error as Error);
    }
  }
}