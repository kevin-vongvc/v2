import React from 'react';

import { render } from '../../test-utils';
import FrontProjectCard from '../cards/FrontProjectCard';

describe('FrontProjectCard component', () => {
  let data = {
    title: 'Test title',
    source: 'www.github.com',
    demo: '',
    excerpt: 'Test test',
    tags: ['javascript', 'jest'],
  };

  test('Should render title, excerpt and tags', () => {
    const { getByText } = render(<FrontProjectCard data={data} />);
    const title = getByText(data.title);
    const excerpt = getByText(data.excerpt);
    expect(title).toBeVisible();
    expect(excerpt).toBeVisible();
    data.tags.map((item) => {
      const tag = getByText(item);
      expect(tag).toBeVisible();
    });
  });
});
