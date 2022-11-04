import { Inject } from '@decorators/di';
import {
    Response,
    Controller,
    Get,
    Post,
    Request,
    Body,
} from '@decorators/express';
import { GalleryService } from '../../services';

@Controller('/')
export class GalleryController {

    constructor(@Inject(GalleryService) private galleryService: GalleryService) { }

    // Create user
    @Post('/addGalleryItem')
    public async addGalleryItem(@Request() req, @Body('image') image: string, @Body('imageName') imageName: string, @Response() res) {
        try {
            const params = { image, imageName };
            const photos = await this.galleryService.addGalleryItem({ ...params });
            res.status(200).json({ data: { photos }, message: 'Image upload successfully' }).end();
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // List Gallery Items
    @Get('/galleryList')
    public async getData(@Response() res) {
        const errors = await this.galleryService.listGalleryItems();
        if (errors) {
            try {
                res.status(200).json({ data: { errors } });
            } catch (error) {
                res.status(500).json({ status: 500, message: 'Error occured' }).end();
            }
        }
    }
}