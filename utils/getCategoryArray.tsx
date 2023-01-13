type CategoryObject = {
    name: string,
    src: string,
    alias?: string
}

export const getCategoryArray = () => {
    const getCategoryArray: CategoryObject[] = [];

    function generateCategory(name: string, src: string, alias: string = null) {
        return (
            {
                name: name,
                src: "https://cdn-icons-png.flaticon.com" + src,
                alias: alias,
            }
        );
    }

    function initCategoryArray() {
        getCategoryArray.push(generateCategory("Sushi", "/512/1539/1539701.png"));
        getCategoryArray.push(generateCategory("Donburi", "/512/3978/3978700.png", "food-and-restaurant"));
        getCategoryArray.push(generateCategory("Ramen", "/512/1046/1046850.png"));
        getCategoryArray.push(generateCategory("Burger", "/512/3075/3075935.png"));
        getCategoryArray.push(generateCategory("?", "/512/84/84042.png", "question-mark"));
    }

    initCategoryArray();

    return getCategoryArray;
};