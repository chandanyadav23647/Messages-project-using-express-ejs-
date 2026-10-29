const express=require("express");

const path=require("path");

const app=express();

const {randomUUID}=require("crypto");

const port=8080;

const methodOverride=require("method-override");

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")))

app.use(express.urlencoded({"extended":"true"}));

app.use(express.json());

app.use(methodOverride("_method"));

let posts=[
	{"id":randomUUID(),"user":"Ela","content":"It is greeting from ela.",replies:""},
	{"id":randomUUID(),"user":"Bob","content":"May be this not cool.",replies:""},
	{"id":randomUUID(), "user":"John","content":"Atleast it's trying to do something.",replies:""},
	{"id":randomUUID(), "user":"Whick","content":"I have literally do it.",replies:""},
	{"id":randomUUID(), "user":"Abraham","content":"I have a great news to share.",replies:""},
	{"id":randomUUID(), "user":"Mic","content":"Anyone instersted to do project with me.",replies:""},
	];
app.get("/posts",(req,res)=>{
	res.render("posts",{posts});
});

app.get("/posts/:id",(req,res)=>{
	let {id}=req.params;
	let data=posts.find((p)=>p.id===id);
	res.render("reply",{data});
});

app.post("/posts/:id/reply",(req,res)=>{
	let {id}=req.params;
	let {reply}=req.body;
	let post=posts.find((p)=>p.id===id);
	post.replies=reply; 
	res.redirect("/posts");
});

app.delete("/posts/:id/delete",(req,res)=>{
	let {id}=req.params;
	posts=posts.filter((p)=>p.id !==id);		
	res.redirect("/posts");
});

app.patch("/posts/:id/reply/edit",(req,res)=>{
	let {id}=req.params;
	post=posts.filter((p)=>p.id ===id);
	// console.log(post);
	// post.replies.indexof()
	res.render("editReply",{post});		
});

app.post("/posts/:id/reply/edit",(req,res)=>{
	let {id}=req.params;
	let {content}=req.body;
	post=posts.filter((p)=>p.id ===id);	
	// console.log(post[0].replies);
	// console.log(content);
	post[0].replies=content;
	res.redirect("/posts");
});

app.delete("/posts/:id/reply/delete",(req,res)=>{
	let {id}=req.params;	
	post=posts.filter((p)=>p.id === id);
	post[0].replies="";
	res.redirect("/posts");
});
app.listen(port,(req,res)=>{
	console.log("your server is running....");
});
