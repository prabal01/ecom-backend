const slugify = require('slugify')
const Category = require('../models/category')

const createNestedCategories =(categoriesList,parentId=null)=>{
console.log(parentId)
    // parentId= String(parentId)
    let filteredCat
    if(parentId===null){
        filteredCat=categoriesList.filter((cat)=> cat.parentId==undefined)
        console.log(filteredCat)
    } else {
        filteredCat=categoriesList.filter((cat)=>cat.parentId==parentId)
        console.log(filteredCat)
    }
    // console.log(filteredCat)
    let resCat = []
    filteredCat.forEach(cat => {
        resCat.push({
            name:cat.name,
            slug:cat.slug,
            id:cat._id,
            children:createNestedCategories(categoriesList,cat._id)
        })
    });
    return resCat
}

exports.createCategory = (req, res, next) => {
    const { name, slug, parentId } = req.body
    const categoryObj = {
        name,
        slug: slugify(req.body.name)
    }
    if (parentId) {
        categoryObj.parentId = parentId
    }

    const cat = new Category(categoryObj)

    cat.save((err, category) => {
        if (err) {
            console.log(err)
            res.status(400).json({
                message: err.message,
            })
        } else if (category) {
            res.status(201).json({ message: 'Category created!', category })
        }
    })

}


exports.getCategories = (req,res,next)=>{
    Category.find({}).then((data,err)=>{
        if(err) res.status(400).json({message:'something went wrong'})
        else if(data){
            const nestedCategories = createNestedCategories(data)
            res.status(200).json({
                categories:nestedCategories
            })
        }
    })
}