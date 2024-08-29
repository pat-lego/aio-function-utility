import {Core} from '@adobe/aio-sdk';
import FunctionManager from './function/function-manager';
import Initializer from './app-initializer';
import Result from './function/result';

export async function main(params: any) {
  const logger = Core.Logger('main', {level: params.LOG_LEVEL || 'info'});
  const fxMgr: FunctionManager = Initializer.initFxMgr();
  
  if (typeof params?.operation === undefined) {
    return <Result<string>> {
      error: 'No operation specified',
      result: undefined
    }
  }

  return (await fxMgr.execute(params.operation, {input: params?.input}));
}