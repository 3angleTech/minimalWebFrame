import { BaseDataObject } from './base.do';

export class User extends BaseDataObject {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public fullName!: string;
}
