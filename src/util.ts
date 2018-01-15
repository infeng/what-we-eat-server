export function createRes(status: number, resObj: any, errorMsg: string = null) {
  return {
    status,
    result: resObj,
    errorMsg,
  };
}

export type LogType = 'database';

export function log(type: LogType, msg: string) {
  return `[${type}]${msg}`;
}
