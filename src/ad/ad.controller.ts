// ad.controller.ts
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { AdService } from './ad.service';
import { CreateAdDto } from './dto/create-ad.dao';
import { EditAdDto } from './dto/edit-ad.dao';

@UseGuards(JwtGuard)
@Controller('ads')
export class AdController {
  constructor(private adService: AdService) {}

  @Get()
  getAllAds() {
    return this.adService.getAllAds();
  }

  @Get(':id')
  getAdById(@Param('id', ParseIntPipe) adId: number) {
    return this.adService.getAdById(adId);
  }

  @Post()
  createAd(@GetUser('id') userId: number, @Body() dto: CreateAdDto) {
    return this.adService.createAd(userId, dto);
  }

  @Patch(':id')
  editAdById(
    @Param('id', ParseIntPipe) adId: number,
    @GetUser('id') userId: number,
    @Body() dto: EditAdDto,
  ) {
    return this.adService.editAdById(adId, userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAdById(@Param('id', ParseIntPipe) adId: number, @GetUser('id') userId: number) {
    return this.adService.deleteAdById(adId, userId);
  }
}
