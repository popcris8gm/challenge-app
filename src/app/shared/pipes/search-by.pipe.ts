import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchBy' })
export class SearchByPipe implements PipeTransform {
  transform(entities: Array<any>, keys: string[], searchByModel: any): Array<any> {
    if (entities?.length) {
      return entities.filter((entity: any) => {
        return isValid(entity, keys, searchByModel);
      });
    }
    return [];
  }
}

const isValid = (entity: any, keys: string[], searchByModel: any): boolean => {
  if (keys) {
    for (const key of keys) {
      if (!String(entity[key])?.toLowerCase().includes(String(searchByModel[key]).toLowerCase())
        && entity[key] && searchByModel[key] !== undefined) {
        return false;
      }
    }
  }

  return true;
};
