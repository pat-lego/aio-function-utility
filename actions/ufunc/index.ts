import {Core} from '@adobe/aio-sdk';
import FunctionManager from '@fx/function-manager';
import Name from '@ops/name';

export async function main(params: any) {
  const logger = Core.Logger('main', {level: params.LOG_LEVEL || 'info'});
  const fm = new FunctionManager();

  logger.info('Initializing Function Manager');
  initializeFxMgr(fm);
}

function initializeFxMgr(fm: FunctionManager): void {
  const n = new Name();
  fm.register(n);
}