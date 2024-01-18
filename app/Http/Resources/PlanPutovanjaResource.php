<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PlanPutovanjaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'planPutovanja';
    
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'user_id' => $this->resource->user_id,
            'destination_id' => $this->resource->destination_id,
            'duration' => $this->resource->duration,
            'budget' => $this->resource->budget,
            'date' => $this->resource->date,
            'description' => $this->resource->description
        ];
    }
}
