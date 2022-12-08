import Category from "./Category";

export default function Categories({categories}){
    return(
        <div className="categories">
            {categories.map(category=><Category key={category.id} category={category}/>)}
        </div>
    )
}