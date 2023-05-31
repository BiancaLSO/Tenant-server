import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from './../src/test.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Issue } from '../src/issues/entities/issue.entity';
import { CreateIssueDto } from '../src/issues/dto/create-issue.dto';

describe('IssueController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let issueRepository: Repository<Issue>;
  let connection: Connection;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    issueRepository = moduleFixture.get(getRepositoryToken(Issue));
    await issueRepository.delete({});

    connection = moduleFixture.get(Connection);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await issueRepository.delete({});
    await moduleFixture.close();
  });

  describe('GET Issues', () => {
    it('should retrieve all issues (GET)', async () => {
      // Arrange
      await Promise.all([
        await issueRepository.insert(
          new CreateIssueDto('Broken toilet', 'Cannot flush'),
        ),

        await issueRepository.insert(
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

  describe('DELETE issue by ID', () => {
    it('should delete an issue by ID (DELETE)', async () => {
      const issue = {
        userId: 1,
        categoryId: 1,
        data: {
          issueId: 1,
          subject: 'Water issue',
          description: 'Water is coming out',
        },
      };
      await request(app.getHttpServer())
        .delete(`/issues/${issue.data.issueId}`)
        .expect(200);
    });
  });

  afterAll(() => {
    app.close();
  });
});
