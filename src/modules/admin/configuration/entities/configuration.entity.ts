import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Configuration {
    @PrimaryGeneratedColumn('uuid')
    config_id: number;

    @Column({unique: true})
    RH1_name: string;
    
    @Column({unique: true})
    RH1_email:string;

    @Column({unique: true})
    RH2_name: string;
    
    @Column({unique: true})
    RH2_email:string;

    @Column({unique: true})
    RH3_name: string;
    
    @Column({unique: true})
    RH3_email:string;

    @Column({unique: true})
    RH4_name: string;
    
    @Column({unique: true})
    RH4_email:string;
    
    @Column({unique: true})
    RH5_name: string;
    
    @Column({unique: true})
    RH5_email:string;

    @Column({unique: true})
    RH6_name: string;
    
    @Column({unique: true})
    RH6_email:string;




    

}
