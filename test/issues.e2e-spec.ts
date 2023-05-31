import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from './../src/test.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Issue } from '../src/issues/entities/issue.entity';
import { CreateIssueDto } from '../src/issues/dto/create-issue.dto';

describe('ProblemController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let problemRepository: Repository<Issue>;
  let connection: Connection;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    problemRepository = moduleFixture.get(getRepositoryToken(Issue));
    await problemRepository.delete({});

    connection = moduleFixture.get(Connection);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await problemRepository.delete({});
    await moduleFixture.close();
  });

  describe('GET Issues', () => {
    it('should retrieve all issues (GET)', async () => {
      // Arrange
      await Promise.all([
        await problemRepository.insert(
          new CreateIssueDto('Broken toilet', 'Cannot flush'),
        ),

        await problemRepository.insert(
          new CreateIssueDto('Broken toilet', 'Water is running constantly'),
        ),
      ]);

      // Act
      const { body }: { body: Issue[] } = await request(app.getHttpServer())
        .get('/issues')
        .expect(200);

      // Assert (expect)
      expect(body.length).toEqual(2);
      expect(body[0].description).toEqual('Cannot flush');
    });
  });

  describe('POST issues', () => {
    it('should create a new issue with no picture (POST)', async () => {
      const issue = {
        userId: 1,
        categoryId: 1,
        data: {
          subject: 'Water issue',
          description: 'Water is coming out',
        },
      };

      const { body }: { body: Issue } = await request(app.getHttpServer())
        .post('/issues')
        .send(issue)
        .expect(201);

      expect(body.subject).toEqual('Water issue');
      expect(body.description).toEqual('Water is coming out');
    });
  });

  afterAll(() => {
    app.close();
  });
});
