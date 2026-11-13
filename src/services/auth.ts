import { javaApi } from "@/lib/api";
import {
  LoginApi,
  RegistroApi,
  sessaoApiSchema,
} from "@/schemas/api/auth.api.schema";

export async function registrarUsuario(dados: RegistroApi) {
  await javaApi.post("/auth/registrar", dados);
}

export async function login(credenciais: LoginApi) {
  const response = await javaApi.post("/auth/login", credenciais);

  return sessaoApiSchema.parse(response.data);
}
