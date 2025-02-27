import 'reflect-metadata';
import { injectable } from 'inversify';
import { CarModel } from './car.model';
import * as _ from 'lodash';

@injectable()
export class CarsService {
    private carsList: CarModel[] = [
        {
            description: 'Description Car 1',
            id: '1',
            name: 'Car 1',
            version: '1.0.0',
        } as CarModel,
        {
            description: 'Description Car 2',
            id: '2',
            name: 'Car 2',
            version: '2.0.0',
        } as CarModel,
    ];

    public getCars(): CarModel[] {
        return this.carsList;
    }

    public addCar(car: CarModel): CarModel {
        this.carsList.push(car);
        return car;
    }

    public deleteCarById(id: string): CarModel {
        const item: CarModel = this.getCarById(id);
        delete this.carsList[id];
        return item;
    }

    public updateCarById(id: string, car: CarModel): CarModel {
        for (let iCar = 0; iCar < this.carsList.length; iCar++) {
            if (this.carsList[iCar].id === id) {
                this.carsList[iCar] = car;
                break;
            }
        }
        return car;
    }

    public getCarById(id: string): CarModel {
        return _.find(this.carsList, (car: CarModel) => {
            return _.isEqual(car.id, id);
        });
    }
}
