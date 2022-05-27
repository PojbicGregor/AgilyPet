module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        /*ime: String,
        pasma: String,
        visina: Number,
        starost: Number,
        zdrastvenoStanje: String*/

        ime: {type:String ,required:true},
            pasma: {type:String ,required:true},
            visina: {type:Number ,required:true},
            starost: {type:Number ,required:true},
            zdravstvenoStanje: {type:String ,required:true}
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Pes = mongoose.model("pes", schema);
    return Pes;
  };
  