import { Category } from './category';

describe("Category Unit Tests", () => {
  test("constructor of category", () => {
    // Triple AAA - Arrange Act Assert

    //Arrange
    const props = {
      name: "Doc",
      description: "Documentary",
      is_active: true,
      created_at: new Date(),
    };

    //Act
    const category = new Category(props);

    //Assert
    expect(category.name).toBe("Doc");
    expect(category.description).toBe("Documentary");
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBe(props.created_at);
  });
});
