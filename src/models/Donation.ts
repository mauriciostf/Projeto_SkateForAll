import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne
} from "typeorm";
import { User } from "../models/User"; // ajuste o caminho conforme necessário

@Entity()
export class Donation {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.donationsMade, { eager: true })
    donor: User;

    @ManyToOne(() => User, user => user.donationsReceived, { eager: true })
    recipient: User;

    @Column()
    item: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ nullable: true })
    imageUrl?: string;


    constructor(donor: User, recipient: User, item: string, description?: string) {
        this.donor = donor;
        this.recipient = recipient;
        this.item = item;
        this.description = description;
    }



}
