import { User } from "./user.model";
import { Meme } from "../../memes/shared/models/view-models/meme.model";

export interface Comment {
    _id: string;
    creator: User;
    content: string;
    createdOn: Date;
    meme: Meme;
}