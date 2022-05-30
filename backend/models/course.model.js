module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
        naziv: {type:String ,required:true},
        slika: {type:Number},
        opis: {type:String ,required:true},
        velikost:{ type : Array , "default" : [] },
        zdrastvenoStanje:{ type : Array , "default" : [] }
        }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Course = mongoose.model("courses", schema);
    return Course;
  };