import { faker } from '@faker-js/faker';

export function generateCommentArticle(): any {
  return {
    _id: faker.string.uuid(),
    author: {
      _id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    text: faker.lorem.sentences({ min: 4, max: 10 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}
