import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import {
    interfaces,
    controller,
    httpGet,
    httpDelete,
    httpPut,
    requestParam,
} from 'inversify-express-utils';
import {
    ApiPath,
    SwaggerDefinitionConstant,
    ApiOperationGet,
    ApiOperationDelete,
    ApiOperationPut,
} from 'swagger-express-ts';
import * as express from 'express';
import { CarModel } from './car.model';
import { CarsService } from './cars.service';

@ApiPath({
    name: 'Cars',
    path: '/cars/{id}',
})
@controller('/cars/:id')
@injectable()
export class CarController implements interfaces.Controller {
    constructor(@inject(CarsService.name) private carsService: CarsService) {}

    @ApiOperationGet({
        description: 'Get car object',
        parameters: {
            path: {
                id: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
        },
        responses: {
            200: {
                model: 'Car',
            },
            400: {},
        },
    })
    @httpGet('/')
    public getCar(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        response.json(this.carsService.getCarById(id));
    }

    @ApiOperationPut({
        description: 'Update car object',
        parameters: {
            path: {
                id: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
            body: {
                description: 'Update car',
                model: 'Car',
                required: true,
            },
        },
        security: {
            apiKeyHeader: [],
        },
        responses: {
            200: {
                model: 'Car',
            },
            400: {},
        },
    })
    @httpPut('/')
    public updateCar(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        if (!request.body) {
            return response.status(400).end();
        }
        const newCar = new CarModel();
        newCar.id = request.body.id;
        newCar.name = request.body.name;
        newCar.description = request.body.description;
        newCar.version = request.body.version;
        response.json(this.carsService.updateCarById(id, newCar));
    }

    @ApiOperationDelete({
        description: 'Delete car object',
        parameters: {
            path: {
                id: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
        },
        security: {
            apiKeyHeader: [],
        },
        responses: {
            200: {
                model: 'Car',
            },
            400: {},
        },
    })
    @httpDelete('/')
    public deleteCar(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        response.json(this.carsService.deleteCarById(id));
    }
}
