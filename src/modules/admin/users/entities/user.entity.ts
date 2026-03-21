import { Column, Entity, ForeignKey, PrimaryGeneratedColumn } from "typeorm";
import { Timestamp } from "typeorm/browser";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column({unique:true, update: false})
    userRFC: string;

    @Column({unique:true, update: false})
    empNumber: string;
    
    @Column()
    name: string;
    
    @Column()
    firstLastName: string;
    
    @Column()
    secondLastName: string;
    
    @Column({unique: true})
    email: string;
    
    @Column()
    hireDate: Date;
    
    @Column({nullable: true })
    termDate?: Date;
    
    @Column()
    status: string;
    
    @Column()
    shiftType: string;
    
    @Column()
    jobRole: string;
    
    @Column({default: true})
    firstTimeLoad: boolean;

    @Column()
    password: string;

    @Column({default: "usuario"})
    empPriv: string;

    @Column({default: 0})
    vacationBalance: number;

    @Column({nullable: true})
    balanceDateTime: Date;

}
