import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'user' })
export class PgUser {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column({ nullable: false })
    name!: string

  @Column({ nullable: false, unique: true })
    email!: string

  @Column({ nullable: false })
    age!: number

  @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date
}
