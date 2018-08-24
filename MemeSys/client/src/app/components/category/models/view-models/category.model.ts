import { User } from "../../../sharedModule/models/user.model";
import { Meme } from "../../../memes/shared/models/view-models/meme.model";

export interface Category {
    _id: string;
    creator: User;
    icon: string;
    name: string;
    memes: Meme[];
    createdOn: Date;
}