import {Command, flags} from '@oclif/command'
import * as express from "express";
var app=express.default()


export class ServerCommand extends Command{

    static description="start survey web server"

    static args=[
        {
            name: 'output',
            required:false,
            description:"folder to put csv tables into",
            default:"."
        }
    ]

    static flags={
        port: flags.integer({
            char:'p',
            description:"port to listen on",
            exclusive:["socket"]
        }),
        socket:flags.string({
            char:'s',
            description:"unix socket to listen on",
            exclusive:["port"]
        })
    }

    async run(){
        const {args,flags}=this.parse(ServerCommand);
        //add last handlers to app
        if (flags.socket)app.listen(flags.socket,x=>this.log("survey server listening on ${flags.socket}"))
        else if(flags.port)this.log("survey server listening on ${app.listen(flags.port).address.toString()}")
        else this.log("survey server listening on ${app.listen().address.toString()}")   
    }
}
