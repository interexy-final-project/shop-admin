import { SortDirections } from "../enum/sort-direction.enum";

export interface SortPaginationParams {
  page: number;
  count: number;
  sortBy: string | null;
  direction: SortDirections;
}
