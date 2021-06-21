export class Endereco {
  key: string;
  userkey: string;
  numero: string;
  complemento: string = null;
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  //Confirmações e erros
  erro: boolean = false;
  principal: boolean = false;
  ativo: boolean = true;
}
