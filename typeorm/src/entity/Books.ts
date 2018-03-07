import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Books {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
    	length: 255
    })
    name: string;

    @Column({
    	length: 255
    })
    authors: string;

    @Column()
    publicationDate: number;

    @Column()
    cover: string;

    @Column()
    genres: string;

    @Column()
    isbn: string;

    @Column()
    rating: string;

    @Column("text")
    description: string;

    @Column()
    link: string;

    @Column()
    fromsite: string;

    @Column()
    reviewsCount: number;

}