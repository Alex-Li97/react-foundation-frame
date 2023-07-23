import http from '@/api';
import { testOrm, ResultData, UpdateTestOrmDto } from '@/api/interface';
/** 创建成功 */
export function TestOrmControllerCreate() {
  return http.post<ResultData<testOrm>>(`/test-orm`, {});
}
/** 查询成功 */
export function TestOrmControllerFindAll() {
  return http.get<ResultData<testOrm>>(`/test-orm`, {});
}
/**  */
export function TestOrmControllerFindOne(id: string) {
  return http.get(`/test-orm/${id}`, {});
}
/**  */
export function TestOrmControllerUpdate(id: string, params: UpdateTestOrmDto) {
  return http.patch(`/test-orm/${id}`, {
    params
  });
}
/**  */
export function TestOrmControllerRemove(id: string) {
  return http.delete(`/test-orm/${id}`, {});
}
