import { CategoryObject } from "../pages/category";

export const getCategoryList = () => {
    const categoryList: CategoryObject[] = [];

    function generateCategory(name: string, src: string, alias: string = null) {
        return (
            {
                name: name,
                src: "https://cdn-icons-png.flaticon.com" + src,
                alias: alias,
            }
        );
    }

    function initCategoryList() {
        categoryList.push(generateCategory("Sushi", "/512/1539/1539701.png"));
        categoryList.push(generateCategory("Donburi", "/512/3978/3978700.png", "food-and-restaurant"));
        categoryList.push(generateCategory("Ramen", "/512/1046/1046850.png"));
        categoryList.push(generateCategory("Burger", "/512/3075/3075935.png"));
        categoryList.push(generateCategory("?", "/512/84/84042.png"));
    }

    initCategoryList();

    return categoryList;
};