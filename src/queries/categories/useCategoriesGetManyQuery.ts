import {useQuery} from "@tanstack/react-query";
import {categoriesQueryClientKeys} from "@/queries/categories/api";
import {categoriesRestApiService} from "@/shared/rest-api/categories";
import {CategoriesModel} from "@/shared/rest-api/categories/CategoriesRestApiService";

export const useCategoriesGetManyQuery = () => {
  const { data } = useQuery<{ data: CategoriesModel[]; total?: number }>({
    queryKey: categoriesQueryClientKeys.getMany(),
    queryFn: () => categoriesRestApiService.getMany(),
  });

  return {
    categoriesList: data?.data,
    total: data?.total,
  }
}