import http from '@/api';
import {
  SwaggerDemo,
  ResultData,
  CreateSwaggerDto,
  UpdateSwaggerDto
} from '@/api/interface';
/** 增加swagger演示 */
export function SwaggerControllerCreate(params: CreateSwaggerDto) {
  return http.post<ResultData<SwaggerDemo>>(`/demo/swagger`, {
    params
  });
}
/** 查找所有swagger演示 */
export function SwaggerControllerFindAll() {
  return http.get<ResultData<SwaggerDemo>>(`/demo/swagger`, {});
}
/**  */
export function SwaggerControllerFindOne(id: string) {
  return http.get<ResultData<SwaggerDemo>>(`/demo/swagger/${id}`, {});
}
/**  */
export function SwaggerControllerUpdate(id: string, params: UpdateSwaggerDto) {
  return http.patch(`/demo/swagger/${id}`, {
    params
  });
}
/**  */
export function SwaggerControllerRemove(id: string) {
  return http.delete(`/demo/swagger/${id}`, {});
}
