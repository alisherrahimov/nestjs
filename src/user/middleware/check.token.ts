import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly Jwt: JwtService,
    @InjectRepository(User) private readonly user: Repository<User>
  ) {
  }

  async use(req: any, res: any, next: () => void) {
    const token: string = req.headers.authorization.split(" ")[1];
    if (token.length !== 0) {
      const user: { email: string; id: string } = await this.Jwt.verify(token, {
        secret: "alisher"
      });

      const findUser = await this.user.findByIds([user.id]);

      if (findUser.length === 0) {
        res.status(401).json({
          message: "User not found",
          success: false
        });
      } else {
        req.id = findUser[0].id;
        next();
      }
    }
  }
}
