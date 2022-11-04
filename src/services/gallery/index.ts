import { Injectable } from "@decorators/di";
import { IGallery } from "../../interface";
import { galleryList } from "../../models";

@Injectable()
export class GalleryService {

    public async addGalleryItem(Params: IGallery) {
		const galleryIns = new galleryList({ ...Params })
		await galleryIns.save();
		return galleryIns;
	}

    public async listGalleryItems() {
        return await galleryList.find({});
    }

}