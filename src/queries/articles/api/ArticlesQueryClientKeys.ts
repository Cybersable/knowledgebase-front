import BaseQueryClientKeysService, {
  BaseQueryClientServiceParams
} from '@/queries/api/BaseQueryClientKeysService';

export default class ArticlesQueryClientKeys
  extends BaseQueryClientKeysService {
  constructor(params: BaseQueryClientServiceParams) {
    super(params);
  }
}