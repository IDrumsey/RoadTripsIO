import { User } from "./user"

export class Comment {
    id: number
    text: string
    datePosted: Date
    owner: User
    replies: Comment[] = []
    parentComment: Comment
}
