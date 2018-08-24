import { User } from '../../../../sharedModule/models/user.model';
import { Comment } from '../../../../sharedModule/models/comment.model';

export interface Meme {
    _id: string;
    creator: User | string;
    title: string;
    image: string;
    category: string;
    votes: number;
    comments: Comment[];
    upVoted: string[];
    downVoted: string[];
    createdOn: Date;
}