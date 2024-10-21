const express=require("express");
const cluster=require("cluster");
const os=require("os");


const totalCPUs=10;

const port=3000;

if(cluster.isPrimary) {
    console.log(`number of CPUSs is ${totalCPUs}`);
    console.log(`primary ${process.pid} is running`)

    //fork workers
    for(let i=0;i<totalCPUs;i++){
        cluster.fork();
    }

    cluster.on("exit",(worker,code,signal)=>{
        console.log(`Worker ${worker.process.pid} died`);
        console.log(`Let's fork another worker!`);
        cluster.fork();
    });


} else {
    const app=express();
    console.log(`worker ${process.pid} started`);

    app.get("/",(req,res)=>{
        res.send("Hello World!")
    })

    app.get("/api/:n",(req,res)=>{
        let n =parseInt(req.params.n);
        let count=0;

        if(n>5000000000) n=5000000000;

        for(let i=1;i<=n;i++){
            count +=i;
        }
        res.send(`Final count is ${count} ${process.pid}`);
    });

    app.listen(port,()=>{
        console.log(`App listening on port ${port}`);
    })
}