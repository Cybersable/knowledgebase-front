import BaseQueryClientKeysService, {
  BaseQueryClientServiceParams
} from '@/queries/api/BaseQueryClientKeysService';

export default class WorkspacesQueryClientKeys
  extends BaseQueryClientKeysService {
  constructor(params: BaseQueryClientServiceParams) {
    super(params);
  }
}