exports.generateCrudMethods= Model=>{
    return{
        getAll:()=>Model.find(),
        getById:id=>Model.findById(id),
        create:record=>Model.create(record),
        findByIdAndUpdate:(id,record)=>Model.findByIdAndUpdate(id,record),
        findByIdAndRemove:id=>Model.findByIdAndRemove(id),

    }
}