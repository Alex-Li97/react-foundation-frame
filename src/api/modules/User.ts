import http from '@/api';
import {
  User,
  ResultData,
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  OmitTypeClass,
  RegisterDto
} from '@/api/interface';
/** 创建用户 */
export function UserControllerCreate(params: CreateUserDto) {
  return http.post<ResultData<User>>(`/user`, {
    params
  });
}
/**  */
export function UserControllerFindAll() {
  return http.get(`/user`, {});
}
/**  */
export function UserControllerFindOne(id: string) {
  return http.get(`/user/${id}`, {});
}
/**  */
export function UserControllerUpdate(id: string, params: UpdateUserDto) {
  return http.patch(`/user/${id}`, {
    params
  });
}
/**  */
export function UserControllerRemove(id: string) {
  return http.delete(`/user/${id}`, {});
}
/** undefined */
export function UserControllerLogin(params: LoginDto) {
  return http.post(`/user/login`, {
    params
  });
}
/** 注册用户 */
export function UserControllerRegister(params: RegisterDto) {
  return http.post<ResultData<OmitTypeClass>>(`/user/register`, {
    params
  });
}
