/**
 * @property id
 * @property name
 * @property createdAt
 * @property updatedAt
 */
export interface SwaggerDemo {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @property code 状态码
 * @property msg 提示信息
 * @property data Generics-响应数据
 */
export interface ResultData<T> {
  /** 状态码 */
  code: number;
  /** 提示信息 */
  msg?: string;
  /** Generics-响应数据 */
  data?: T;
}

/**
 * @property name swagger name
 */
export interface CreateSwaggerDto {
  /** swagger name */
  name: string;
}

/**
 */
export interface UpdateSwaggerDto {}

/**
 * @property id
 * @property key
 * @property name
 * @property value
 * @property remark
 */
export interface testOrm {
  id: number;
  key: string;
  name: string;
  value: string;
  remark: string;
}

/**
 */
export interface UpdateTestOrmDto {}

/**
 * @property id
 * @property name
 * @property age
 * @property password
 * @property token
 * @property createdAt
 * @property updatedAt
 */
export interface User {
  id: number;
  name: string;
  age: number;
  password: string;
  token?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @property id
 * @property age
 * @property password
 * @property token
 * @property createdAt
 * @property updatedAt
 */
export interface OmitTypeClass {
  id: number;
  age: number;
  password: string;
  token?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @property name 用户名
 * @property password 密码
 * @property age 年龄
 */
export interface CreateUserDto {
  /** 用户名 */
  name: string;
  /** 密码 */
  password: string;
  /** 年龄 */
  age: number;
}

/**
 */
export interface UpdateUserDto {}

/**
 * @property name 用户名
 * @property password 密码
 */
export interface LoginDto {
  /** 用户名 */
  name: string;
  /** 密码 */
  password: string;
}

/**
 * @property name 用户名
 * @property password 密码
 */
export interface RegisterDto {
  /** 用户名 */
  name: string;
  /** 密码 */
  password: string;
}
