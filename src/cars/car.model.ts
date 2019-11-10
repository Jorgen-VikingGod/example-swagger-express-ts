import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel({
    description: 'Car description',
    name: 'Car',
})
export class CarModel {
    @ApiModelProperty({
        description: 'Id of car',
        required: true,
    })
    public id: string;

    @ApiModelProperty({
        description: 'Name of car',
        required: true,
    })
    public name: string;

    @ApiModelProperty({
        description: 'Description of car',
        required: true,
    })
    public description: string;

    @ApiModelProperty({
        description: 'Version of car',
        required: true,
    })
    public version: string;
}
