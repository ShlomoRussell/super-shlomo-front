export class User {
  constructor(
    public id?: string,
    public email?: string,
    public username?: string,
    public password?: string,
    public confirmPassword?:string,
    public firstName?: string,
    public lastName?: string,
    public city?: string,
    public street?: string,
    public teudatZehut?: number,
    public token?: string,
    public role?:'Admin'|'Customer'
  ) {}
}
