import { User } from "../../../core/models/user.model";

export interface Meme {
    _id: string;
    creator: User;
    title: string;
    image: string;
    upvote: number;
    upVoted: string[];
    downVoted: string[];
    createdOn: Date;
}