import {
    Body,
    Controller,
    Get,
    Patch,
    UseGuards,
    Param,
    ParseIntPipe
  } from '@nestjs/common';
  import { User } from '@prisma/client';
  import { GetUser } from '../auth/decorator';
  import { JwtGuard } from '../auth/guard';
  import { ChangePasswordDto, EditUserDto } from './dto';
  import { UserService } from './user.service';
  import { Role } from '@prisma/client';
  
  @UseGuards(JwtGuard)
  @Controller('users')
  export class UserController {
    constructor(private userService: UserService) {}
  
    @Get('me')
    getMe(@GetUser() user: User) {
      return user;
    }
  
    @Patch()
    editUser(
      @GetUser('id') userId: number,
      @Body() dto: EditUserDto
    ) {
      return this.userService.editUser(userId, dto);
    }
  
    @Patch(':id/role')
    async changeRole(
      @Param('id', ParseIntPipe) targetUserId: number, 
      @Body() body: { newRole: Role }, 
      @GetUser('id') adminUserId: number 
    ) {
      return this.userService.changeRole(adminUserId, targetUserId, body.newRole);
    }
  
    @Patch('change-password')
    changePassword(
      @GetUser('id') userId: number,
      @Body() dto: ChangePasswordDto
    ) {
      return this.userService.changePassword(userId, dto);
    }
  }
  