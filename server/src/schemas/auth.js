import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string()
    .min(2, '用户名至少需要2个字符')
    .max(50, '用户名最多50个字符'),
  email: z.string()
    .email('请输入有效的邮箱地址'),
  password: z.string()
    .min(8, '密码至少需要8个字符')
    .max(100, '密码最多100个字符')
});

export const loginSchema = z.object({
  email: z.string()
    .email('请输入有效的邮箱地址'),
  password: z.string()
    .min(1, '请输入密码')
});