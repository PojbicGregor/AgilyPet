module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            /*email: String,
            username: String,
            password: String*/

            email: {type:String ,required:true, unique:true},
            username: {type:String ,required:true, unique:true},
            password: {type:String ,required:true},
            token:{type:String},
            course:{ type : Array , "default" : [] },
            prijavljeni:{ type : Array , "default" : [] },
            pes:{ type : Array , "default" : [] }
        }
      );

      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    const Uporabnik = mongoose.model("registriran_uporabniks", schema);  //mogoce kakse drugo ime v model
    return Uporabnik;
};
