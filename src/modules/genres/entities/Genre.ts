import { Game } from './../../games/entities/Game';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  import { User } from '../../users/entities/User';
  
  @Entity('genres')
  export class Genre {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToMany(() => Game, (game) => game.genres)
    games: Game[];
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  