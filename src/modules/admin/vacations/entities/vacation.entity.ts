import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './../../users/entities/user.entity'; 


@Entity("vacations")
export class Vacation {
    @PrimaryGeneratedColumn()
    vacationId!: number;

    @Column()
    userId!: string;

    @Column()
    period!: string;

    @Column()
    recordType!: string;

    @Column({ type: "date" })
    fechaInicio!: Date;

    @Column({ type: "date" })
    fechaFinal!: Date;

    @Column()
    vacationDays!: string;

      // Relación con User
    @ManyToOne(() => User, (user) => user.vacations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' }) // Especificamos que use 'userId' como FK
    user: User;

 
}
