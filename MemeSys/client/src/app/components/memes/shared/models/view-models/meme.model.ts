import { User } from '../../../../shared/models/user.model';
import { Comment } from '../../../../shared/models/comment.model';

export interface Meme {
    _id: string;
    creator: string;
    title: string;
    image: string;
    category: string;
    votes: number;
    comments: Comment[];
    upVoted: string[];
    downVoted: string[];
    createdOn: Date;
}