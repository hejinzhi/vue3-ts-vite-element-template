import request from '@/utils/request'
import { baseUrl } from '@/config'

export interface ILogin {
  token: string;
}

export interface IUserInfo {
  avatar: string,
  introduction: string,
  name: string,
  roles: string[]
}

export interface LoginBodyProps {
  tel: string;
  password: string;
}

export const login = (data: LoginBodyProps) => {
  return request<ILogin>({
    url: `${baseUrl}/person/login`,
    method: 'post',
    data
  })
}

export const getInfo = async() => {
  const res = await request.get<IUserInfo>(`${baseUrl}/person/userinfo`)
  return res.data
}
