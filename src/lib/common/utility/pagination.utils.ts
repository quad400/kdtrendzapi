import { Repository } from 'typeorm';
import { Order } from '../enum/order.enum';
import { PageDto, PageMetaDto, PageOptionsDto } from '../dto/pagination.dto';

export interface PaginationQuery {
  repo: string;
  skip: number;
  take: number;
  order: Order;
}

export async function paginate<T>(
  repository: Repository<T>,
  pageOptionsDto: PageOptionsDto,
  repo: string,
) {
  const { order, page, limit } = pageOptionsDto;

  const skip = (page - 1) * limit;

  const queryBuilder = repository
    .createQueryBuilder(repo)
    .orderBy(`${repo}.created_at`, order)
    .skip(skip)
    .limit(limit);

  const itemCount = await queryBuilder.getCount();
  const { entities } = await queryBuilder.getRawAndEntities();

  const pageMetaDto = new PageMetaDto({
    itemCount,
    pageOptionsDto,
  });

  return new PageDto(entities, pageMetaDto);
}
