var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('coneccted');
    var kittySchema = mongoose.Schema({
        name: {
            first: String,
            last: String
        },
        age: Number
    });
    kittySchema.virtual('name.full').get(function(){
    	return this.name.first+' '+this.name.last;
    });
    kittySchema.methods.speak = function() {
        var greeting = this.name ? "Meow name is " + this.name.full : "I don't have a name"
        console.log(greeting);
    }


    var Kitten = mongoose.model('Kitten', kittySchema);
    var michu = new Kitten({
    	name:{
    		first:'michu',
    		last: 'galapo'
    	},
    	age:5
    });

    michu.save();

    console.log(michu.speak());


});