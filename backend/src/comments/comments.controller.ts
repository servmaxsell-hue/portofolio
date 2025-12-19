import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    UseGuards,
    Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    create(
        @Body()
        createCommentDto: {
            name: string;
            email: string;
            content: string;
            article_id: number;
        },
    ) {
        return this.commentsService.create(createCommentDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Query('all') all: string) {
        return this.commentsService.findAll(all === 'true');
    }

    @Get('article/:articleId')
    findByArticle(@Param('articleId') articleId: string) {
        return this.commentsService.findByArticle(+articleId);
    }

    @Patch(':id/approve')
    @UseGuards(JwtAuthGuard)
    approve(@Param('id') id: string) {
        return this.commentsService.approve(+id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.commentsService.remove(+id);
    }
}
