import { Controller, Get, Query, Req } from '@nestjs/common'
import { ProductService } from '@/app-module/product/product.service'
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger'
import { AuthToken, AppToken } from '@/guard/app.guard'
import * as Face from '@/interface/entity.interface'
import * as path from '@/interface/path.interface'

@ApiTags('商品模块')
@Controller(path.App('product'))
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiOperation({ summary: '商品详情' })
	@ApiQuery({ name: 'id', required: true, description: '商品id' })
	@ApiHeader({ name: 'app-token' })
	@Get('info')
	@AuthToken(true)
	@AppToken(true)
	async productInfo(@Query('id') id: number, @Req() req: { ipv4: string; user?: Face.UserFace }) {
		return await this.productService.productInfo(id, req.user?.uid)
	}

	@ApiOperation({ summary: '商品添加收藏、取消收藏' })
	@ApiQuery({ name: 'id', required: true, description: '商品id' })
	@ApiHeader({ name: 'app-token', required: true })
	@Get('star')
	@AuthToken(true)
	async productStar(@Query('id') id: number, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.productService.productStar(id, req.user.uid)
	}
}
