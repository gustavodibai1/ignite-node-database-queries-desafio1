import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder("game")
      .where("LOWER(game.title) like LOWER(:title)", { title: `%${param}%` })
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`SELECT COUNT(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    
    const games = await this.repository.createQueryBuilder("game")
    .leftJoinAndSelect("game.users", "user")
    .where("game.id = :id", { id: id })
    .getOneOrFail();

    return games.users; 

  }
}
