import { NotFoundException } from "@nestjs/common"

export const getOne = (
  id: number,
  array: any[],
  thing: string = 'Item'
  ) => {
  const item = array.find(item => item.id === id)
    if(!item) {
      throw new NotFoundException(`${thing} #${id} not found`)
    }

    return item
}

export const getIndex = (
  id,
  array,
  thing
  ) => {
    const index = array.findIndex(product => (
      product.id === id
    ))
    if(index < 0) {
      throw new NotFoundException(`${thing} #${id} not found`);
    }
    return index
}
