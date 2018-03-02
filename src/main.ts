import * as bodyParser from "body-parser";
import * as express from "express";
import "reflect-metadata";
import { Container } from "inversify";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import { VersionController } from "./version/version.controller";
import * as swagger from "swagger-express-ts";
import {SwaggerDefinitionConstant} from "swagger-express-ts";

// set up container
const container = new Container();

// note that you *must* bind your controllers to Controller
container.bind<interfaces.Controller>( TYPE.Controller )
    .to( VersionController ).whenTargetNamed( VersionController.TARGET_NAME );
// container.bind<FooService>('FooService').to(FooService);

// create server
const server = new InversifyExpressServer( container );

server.setConfig( ( app: any ) => {
    app.use( '/api-docs/swagger', express.static( 'swagger' ) );
    app.use( '/api-docs/swagger/assets', express.static( 'node_modules/swagger-ui-dist' ) );
    app.use( bodyParser.json() );
    app.use(swagger.express({
        definition: {
            info : {
                title : "My api",
                version : "1.0"
            },
            models : {
                Version : {
                    properties : {
                        id : {
                            type : SwaggerDefinitionConstant.Model.Property.Type.STRING,
                            required : true
                        },
                        name : {
                            type : SwaggerDefinitionConstant.Model.Property.Type.STRING,
                            required : true
                        },
                        description : {
                            type : SwaggerDefinitionConstant.Model.Property.Type.STRING
                        },
                        version : {
                            type : SwaggerDefinitionConstant.Model.Property.Type.STRING
                        }
                    }
                }
            },
            externalDocs : {
                url : "My url"
            }
        }
    }));
} );

server.setErrorConfig( ( app: any ) => {
    app.use( ( err: Error, request: express.Request, response: express.Response, next: express.NextFunction ) => {
        console.error( err.stack );
        response.status( 500 ).send( "Something broke!" );
    } );
} );

const app = server.build();
app.listen( 3000 );
console.info( "Server is listening on port : 3000");
