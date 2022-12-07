import Category from "./Category";

export default function Categories({categories}){
    return(
        <div className="categories">
            <h3>বিভাগ সমুহঃ</h3>
            {categories.map(category=><Category key={category.id} category={category}/>)}
        </div>
    )
}