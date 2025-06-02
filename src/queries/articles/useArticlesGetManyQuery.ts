import {useQuery} from "@tanstack/react-query";
import {articlesQueryClientKeys} from "@/queries/articles/api";
import {articlesRestApiService} from "@/shared/rest-api/articles";
import {ArticlesModel} from "@/shared/rest-api/articles/ArticlesRestApiService";

export const useArticlesGetManyGetManyQuery = () => {
  const { data } = useQuery<{ data: ArticlesModel[]; total?: number }>({
    queryKey: articlesQueryClientKeys.getMany(),
    queryFn: () => articlesRestApiService.getMany(),
  });

  return {
    articlesList: data?.data,
    total: data?.total,
  }
}