import * as bcryptjs from 'bcryptjs';

export default abstract class Bcryptjs {
  public static generate(password: string): string {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt)
  }

  public static compare(password: string, hash: string): boolean {
    return bcryptjs.compareSync(password, hash);
  }
}
