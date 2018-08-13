import { User } from "../../../shared/models/user.model";
import { Meme } from "./meme.model";

export interface Category {
    _id: string;
    creator: User;
    icon: string;
    name: string;
    memes: Meme[];
    createdOn: Date;
}