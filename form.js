var http = require('http');
var fs = require('fs');
var formidable = require('formidable');

http.createServer(function(req,res){
    if(req.url == '/'){
        res.writeHead(200,{'Content-type':'text/html'});
        res.write('<form action="biodata" method="post" enctype="multipart/form-data">');
        res.write('<h1>sign up</h1><br>');
        res.write('Name <input type="text" name="username"><br>');
        res.write('mobile number <input type="number" name="mno"><br>');
        res.write('d.o.b <input type="date" name="dob"><br>');
        res.write('email <input type="email" name="email"><br>');
        res.write('upload your resume <input type="file" name="upload"><br>');
        res.write('<input type="submit">');
        res.end();
    }
    else if(req.url == '/biodata'){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err,fields,files){
            res.write('<h1>Name:'+fields.username+'</h1><br>');
            res.write('<h1>mobile no:'+fields.mno+'</h1><br>');
            res.write('<h1>D.o.b:'+fields.dob+'</h1><br>');
            res.write('<h1>email:'+fields.email+'</h1><br>');

            var oldpath = files.upload.path;
            var newpath = 'marjick7@marjick7-HP-245-G5-Notebook-PC:~/nodejs'+ files.upload.name;
            fs.rename(oldpath,newpath,function(err){
                
                if(err) throw err;
                res.write('<h1>your file location</h1><br>');
                res.write('<h1>old path:'+oldpath+'</h1><br>');
                res.write('<h1>new path:'+newpath+'</h1><br>');
                res.end('<h1>your resume has been submitted</h1>');
                
            })
        })
    }
    else{
        res.end('<h1>404 page not found')
    }
}).listen(8080);
      