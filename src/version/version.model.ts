import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Version description",
  name: "Version"
})
export class VersionModel {
  @ApiModelProperty({
    description: "Id of version",
    required: true
  })
  id: number;

  @ApiModelProperty({
    description: "",
    required: true
  })
  name: string;

  @ApiModelProperty({
    description: "Description of version",
    required: true
  })
  description: string;
}
