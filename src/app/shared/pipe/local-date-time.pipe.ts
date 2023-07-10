import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'localDateTimePipe'
})
export class LocalDateTimePipe implements PipeTransform {
  transform(date: string): string {
    const formattedDate = format(new Date(date), 'dd-MM-yyyy HH:mm');
    return formattedDate;
  }
}
