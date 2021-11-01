import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

@Entity('users')
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ length: 30 })
  first_name: string;

  @Expose()
  @Column({ length: 30 })
  last_name: string;

  @Expose()
  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Expose()
  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;
}
