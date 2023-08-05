import { omit } from 'lodash';
import { Category, CategoryProperties } from './category';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';

describe("Category Unit Tests", () => {

  test("ID field with uuid", () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId}
    const data: CategoryData[] = [
      { props: {name: "Movie"}},
      { props: {name: "Movie"}, id: null},
      { props: {name: "Movie"}, id: undefined},
      { props: {name: "Movie"}, id: new UniqueEntityId()},
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id as any);
      expect(category.id).not.toBeNull();
      // expect(category.id).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("Create category of constructor", () => {
    let category = new Category({name: 'Movie'});
    let props = omit(category.props, 'created_at');
    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
    });
    let created_at = new Date();
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    })

    category = new Category({
      name: "Movie",
      description: "other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description"
    });

  });

  test("getter of name field", () => {
    const category = new Category({name: "Movie"});
    expect(category.name).toBe("Movie");
  });

  test("getter of setter of description field", () => {
    let category = new Category({name: "Movie"});
    expect(category.name).toBe("Movie");
    expect(category.description).toBeNull();

    category = new Category({
      name: "Movie",
      description: "my description"
    })
    expect(category.description).toBe("my description");

    category = new Category({
      name: "Movie",
    });

    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["description"] = null;
    expect(category.description).toBeNull();
  })

  test("getter and setter of is_active prop", () => {
   let category = new Category({
      name: "Movie",
      description: "other description",
    });

    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie",
      is_active: false,
    });
    expect(category.is_active).toBeFalsy();
  })

  test("getter of created_at prop", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.created_at).toBe(created_at)
  });
});
