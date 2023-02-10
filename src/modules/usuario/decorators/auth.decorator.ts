import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role.guard";

export const Auth = () => {
    return  applyDecorators(
        UseGuards(AuthGuard('jwt'),
            UserRoleGuard
        )
    )
}
