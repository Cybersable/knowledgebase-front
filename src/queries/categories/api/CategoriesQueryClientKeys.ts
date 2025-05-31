import BaseQueryClientKeysService, {
  BaseQueryClientServiceParams
} from '@/queries/api/BaseQueryClientKeysService';

export default class CategoriesQueryClientKeys
  extends BaseQueryClientKeysService {
  constructor(params: BaseQueryClientServiceParams) {
    super(params);
  }
}
