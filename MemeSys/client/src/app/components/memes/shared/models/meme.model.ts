import { User } from '../../../shared/models/user.model';
import { Comment } from '../../../shared/models/comment.model';

export interface Meme {
    _id: string;
    creator: User;
    title: string;
    image: string;
    votes: number;
    comments: Comment[];
    upVoted: string[];
    downVoted: string[];
    createdOn: Date;
}